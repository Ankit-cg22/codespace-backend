const handleEditorValueEmit = (socket , value) => {
    // console.log(value)
    socket.broadcast.emit('editor-value-broadcast' , value)
}

const handleInputValueEmit = (socket , value) => {
    // console.log(value)
    socket.broadcast.emit('input-value-broadcast' , value)
}

const handleOutputValueEmit = (socket , value) => {
    socket.broadcast.emit('output-value-broadcast' , value)
}

const handleLanguageChangeEmit = (socket , language) => {
    socket.broadcast.emit('language-change-broadcast' , language)
}

module.exports = {handleEditorValueEmit , handleInputValueEmit, handleOutputValueEmit ,handleLanguageChangeEmit}