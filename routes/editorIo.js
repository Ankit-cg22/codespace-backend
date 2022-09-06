const {handleEditorValueEmit , handleInputValueEmit , handleOutputValueEmit , handleLanguageChangeEmit} = require('../controllers/editorIo')

module.exports = (io , socket) => {
    socket.on('editor-value-emit' , value => {
        handleEditorValueEmit(socket , value)
    })

    socket.on('input-value-emit' , value=>{
        handleInputValueEmit(socket , value)
    })

    socket.on('output-value-emit' , value=>{
        handleOutputValueEmit(socket, value)
    })
    
    socket.on('language-change-emit' , language => {
        handleLanguageChangeEmit(socket , language)
    })
}