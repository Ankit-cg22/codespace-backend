const express = require('express')

const cors = require('cors')
require('dotenv').config()
const {onConnection} = require('./utils/iosetup')

const app = express() ;
app.use(express.urlencoded({extended :  true}))
app.use(express.json())
app.use(cors({origin:'*'}))

const server = require('http').Server(app)

const io = require('socket.io')(server , {
    cors : {
        origin : '*', 
        credentials: true  
    }
})
io.on('connection' , (socket) => onConnection(io , socket) )

// routes 
const authRoutes = require('./routes/auth')
const profilePageRoutes = require('./routes/profilePage')
const userActionRoutes = require('./routes/userActions')

app.use('/auth' , authRoutes)
app.use('/profile-page', profilePageRoutes)
app.use('/userAction' , userActionRoutes)
app.get('/' , (req , res)=>res.send("Welcome to codespace backend."))

const PORT = process.env.PORT || 8000 ;
server.listen(PORT , ()=>console.log("running.."))