const handleMouseMove = (socket, value) => {
    socket.to(value.roomId).emit('mouse-move-broadcast' , value)
}

const handleDraw = (socket, value) => {
    socket.to(value.roomId).emit('draw-broadcast' , value)
}

const handleClearCanvas = (socket , roomId) =>{
    socket.to(roomId).emit('clear-canvas-broadcast')
}

module.exports = {handleMouseMove , handleDraw , handleClearCanvas}