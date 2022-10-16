const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async(req , res , next)=>{
    try {
        
        // 1 . destructure the token 
        const jwttoken = req.header("token")
        
        if(!jwttoken){
            return res.status(403).json({message : "You are not authorized !"})
        }
        const payload = jwt.verify(jwttoken , process.env.JWT_SECRET)

        req.user = payload.user
        next();

    } catch (err) {
        console.log(err.message)
        return res.status(403).json({message : "You are not authorized !"})
    }

}