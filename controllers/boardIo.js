const handleMouseMove = (socket, value) => {
    socket.broadcast.emit('mouse-move-broadcast' , value)
}

const handleDraw = (socket, value) => {
    socket.broadcast.emit('draw-broadcast' , value)
}

module.exports = {handleMouseMove , handleDraw}