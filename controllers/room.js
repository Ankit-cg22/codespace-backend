const handleJoinRoom = (io ,socket , roomId , userId) => {
    socket.join(roomId)
    console.log("romId")
    console.log(roomId)
    socket.to(roomId).emit('user-connected' , userId)

    socket.on('disconnect', ()=>{
        socket.to(roomId).emit('user-disconnected' , userId)
    })
}

module.exports = {handleJoinRoom}