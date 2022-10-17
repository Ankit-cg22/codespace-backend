const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

const handleRegister = async(req , res) => {

    try {
        //1 . destructure req.body to get name , email , password
        const {name , email , password} = req.body ;
        
        //2 . check if user exist , if exists throw error
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1' ,
            [email]
        );
        
        if(user.rows.length !== 0)
        {
            // user with that email already exists 
            return res.status(401).json({message : "Email already exists !"});
        }

        //3 .  bcrypt the password
        const saltRounds = 10 ;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password , salt)

        //4 . enter the new user in database 
        const newUser = await pool.query(
            'INSERT INTO users (name , email , password) VALUES ($1 , $2 , $3) RETURNING user_id , name , email ' ,
            [name , email , bcryptPassword]
        );
            
        //5 . generate the jwt token 
        const token = jwtGenerator(newUser.rows[0].user_id)
        
        res.json({token , user : newUser.rows[0]})

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
}

const handleLogin = async(req ,res)=>{
    
    try {

        //1 . destructure req.body
        const {email , password} = req.body;

        //2 . check if user exists ,if doesn't throw error
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1' , 
            [email]
        )

        if(user.rows.length === 0)
        {
            return res.status(401).json({message : "Email does not exist !"})
        }

        const currentUser = user.rows[0]
        
        //3 . if incoming password is same as database password
        // if not match , throw error
        const validPassword = await bcrypt.compare(password , currentUser.password)
        // console.log(validPassword)

        if(!validPassword)
        {
            return res.status(401).json({message : "Wrong password !"})
        }

        //4 . generate the jwt token for the user 
        const token = jwtGenerator(currentUser.user_id)

        res.status(200).json({message : "Login successful" , token , user:{user_id : currentUser.user_id ,name:currentUser.name , email:currentUser.email}})
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

}

const handleVerification = async(req,  res)=>{
    
    try {
        
        const user = await pool.query(
            'SELECT user_id , name , email FROM users WHERE user_id = $1' ,
            [req.user]
        )
        
        res.json({isVerified:true , user : user.rows[0] });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message : "Server Error"})
    }
}

module.exports = {handleRegister , handleLogin , handleVerification}