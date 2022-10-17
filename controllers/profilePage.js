const pool = require('../db')

const getProfileInfo = async(req , res)=>{

    // console.log("getting info")
    
    try {
         // we are here means the token passed the authorization middleware => it is a valid token
        const id = req.user 
        // req.user = user_id
        // while creating token we used user_id 
        // so out of the token we obtain user_id

        const user = await pool.query(
            'SELECT name , email FROM users WHERE user_id = $1' , 
            [id]
        )

        const savedSnippets = await pool.query(
            'SELECT snippet_id , title , code , lang FROM codesnippets WHERE user_id = $1' ,
            [id]
        )

        res.status(200).json({user : user.rows[0] , savedSnippets : savedSnippets.rows})
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message : "server error"})
    }
}

const handleSaveSnippet = async (req , res)=>{

    // console.log("saving snippet")

    const {user_id , title , code , lang} = req.body
    
    try {
        
        const newSnippet = await pool.query(
            'INSERT INTO codesnippets (title , code , lang , user_id ) VALUES ($1 , $2 , $3 , $4)' ,
            [title , code, lang, user_id ]
        )
        
        res.status(200).json({message : "Snippet Added"});

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message : "Server Error "})
    }

}

const handleUpdateSnippet = async(req , res)=>{

    // console.log("updating snippet")

    const {id} = req.params
    const {code} = req.body

    try {
        const updatedSnippet = await pool.query(
            'UPDATE codesnippets SET code = $1 WHERE snippet_id = $2 RETURNING snippet_id , title , code , lang ' ,
            [code , id] 
        )

        console.log("updated")

        res.status(200).json({message:"Updated successfully" ,snippet : updatedSnippet.rows[0]})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"Server Error"})
    }

    
}

const handleDeleteSnippet = async(req , res)=>{

    // console.log("deleting snippet")

    const {id} = req.params

    try {

        const deletedSnippet = await pool.query(
            'DELETE FROM codesnippets WHERE snippet_id = $1' ,
            [id]
        )
        console.log("deleted")
        res.status(200).json({message : "Deleted successfully"})
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message : "Server Error"})
    }
}




module.exports= {getProfileInfo , handleSaveSnippet , handleUpdateSnippet , handleDeleteSnippet}