const {handleMouseMove , handleDraw , handleClearCanvas} = require('../controllers/boardIo')

module.exports = (io , socket) => {

    socket.on('mouse-move-emit' , value => {
        // handleEditorValueEmit(socket , value)
        handleMouseMove(socket , value)
    })

    socket.on('draw-emit' , value => {
        handleDraw(socket , value)
    })

    socket.on('clear-canvas-emit', (roomId)=>{
        handleClearCanvas(socket , roomId)
    })

}