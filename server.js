const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const app = express() ;
const {v4 } = require('uuid')

app.use(express.urlencoded({extended :  true}))
app.use(express.json())
app.use(cors({origin:'*'}))
const server = require('http').Server(app)

const rooms = []    

const io = require('socket.io')(server , {
    cors : {
        origin : '*',   
    }
})

const editorIoHandler = require('./routes/editorIo')
const boardIoHandler = require('./routes/boardIo')
const roomHandler = require('./routes/room')

const onConnection = (socket) => {
    editorIoHandler(io , socket)
    boardIoHandler(io , socket)
    roomHandler(io  ,socket)
    socket.emit('connected')

}

io.on('connection' , onConnection )

app.get('/' , (req , res)=>{
    res.send("Welcome to server !")
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

    axios.post("https://api.jdoodle.com/v1/execute" , program)
    .then(function(response){
        res.status(200).json({data: response.data})
    })
    .catch(function(error){
        console.log(error.message)
        res.status(500).json({message : error.message})
    })
    
})

app.get('/createRoom' , (req , res)=>{
    const roomId = v4()
    rooms.push(roomId);
    res.status(200).json({roomId});

})

app.post('/join-room' , (req  , res)=>{
    const roomId = req.body.roomId 

    if(rooms.includes(roomId)) return res.status(200).json({roomId})

    res.status(404).json({message: "No such room"})
})

const PORT = process.env.PORT || 8000 ;
// app.listen(PORT , ()=>console.log(`Server running on http://localhost:${PORT} ... `))
server.listen(PORT , ()=>console.log("running.."))