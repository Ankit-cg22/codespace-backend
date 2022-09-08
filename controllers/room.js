const handleJoinRoom = (socket , roomId) => {
    socket.join(roomId)
}

module.exports = {handleJoinRoom}