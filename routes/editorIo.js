const {handleEditorValueEmit , handleInputValueEmit , handleOutputValueEmit , handleLanguageChangeEmit} = require('../controllers/editorIo')

module.exports = (io , socket) => {
    socket.on('editor-value-emit' , (value , roomId) => {
        handleEditorValueEmit(socket , value , roomId)
    })

    socket.on('input-value-emit' , (value , roomId)=>{
        handleInputValueEmit(socket , value , roomId)
    })

    socket.on('output-value-emit' , (value , roomId)=>{
        handleOutputValueEmit(socket, value , roomId)
    })
    
    socket.on('language-change-emit' , (language , roomId) => {
        handleLanguageChangeEmit(socket , language , roomId)
    })
}