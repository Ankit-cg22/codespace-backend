const handleJoinRoom = (io ,socket , roomId , userId) => {
    socket.join(roomId)
    // console.log(roomId)
    socket.to(roomId).emit('user-connected' , userId)

    socket.on('disconnect', ()=>{
        socket.to(roomId).emit('user-disconnected' , userId)
    })
}

module.exports = {handleJoinRoom}