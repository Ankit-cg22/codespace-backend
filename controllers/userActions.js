const axios = require('axios')
const {v4 } = require('uuid')
const pool = require('../db')
const checkIfValidUUID = require('../utils/uuidChecker')

const handleCompile = (req , res)=>{

    // console.log("compiling code")

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

    axios.post("https://api.jdoodle.com/v1/execute" , program)
    .then(function(response){
        res.status(200).json({data: response.data})
    })
    .catch(function(error){
        console.log(error.message)
        res.status(500).json({message : error.message})
    })
    
} 

const handleCreateRoom = async (req , res)=>{
    
    // console.log("creating room")

    try {
        const roomId = v4()
    
        const newRoom = await pool.query(
            'INSERT INTO rooms (room_id) values ($1) ' ,
            [roomId]
        )
        console.log(`created room ${roomId}`)
        res.status(200).json({roomId});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : "Server Error"})
    }

}

const handleJoinRoom = async (req  , res)=>{

    // console.log("joining room")

    const roomId = req.body.roomId 

    try {
        if(checkIfValidUUID(roomId)){
            const rooms = await pool.query(
                'SELECT * FROM rooms WHERE room_id = $1' ,
                [roomId]
            )
            
            if(rooms.rowCount == 1 ){
                console.log(`joined room ${roomId}`)
                return res.status(200).json({roomId})
            }
        }
       
        res.status(404).json({message: "No such room"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : "Server Error"})
    }
    
}

module.exports = {handleCompile , handleCreateRoom , handleJoinRoom}