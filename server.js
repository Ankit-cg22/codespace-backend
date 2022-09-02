const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const app = express() ;
app.use(express.urlencoded({extended :  true}))
app.use(express.json())
app.use(cors({origin:'*'}))

app.get('/' , (req , res)=>{
    res.send("Halo !")
})

app.post('/compile' , (req , res)=>{
    const code = req.body.code
    const input = req.body.input
    let lang = req.body.lang
    if(lang === 'python') lang = "python3"

    var program = {
        script : code ,
        language: lang,
        versionIndex: "0",
        clientId: process.env.CLIENT_ID , 
        clientSecret:process.env.CLIENT_SECRET ,
        stdin: input
    };

    // axios.post("https://api.jdoodle.com/v1/execute" , program)
    // .then(function(response){
    //     res.status(200).json({data: response.data})
    // })
    // .catch(function(error){
    //     console.log(error.message)
    //     res.status(500).json({message : "Server error"})
    // })
    
})

const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>console.log(`Server running on http://localhost:${PORT} ... `))
