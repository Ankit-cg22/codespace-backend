const {handleJoinRoom} = require('../controllers/room')

module.exports = (io , socket) => {
    socket.on('join-room' , (roomId) => {
        handleJoinRoom(socket , roomId)
    })
}