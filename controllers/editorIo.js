const handleEditorValueEmit = (socket , value , roomId) => {
    // console.log(value)
    socket.to(roomId).emit('editor-value-broadcast' , value)
}

const handleInputValueEmit = (socket , value , roomId) => {
    // console.log(value)
    socket.to(roomId).emit('input-value-broadcast' , value)
}

const handleOutputValueEmit = (socket , value , roomId) => {
    socket.to(roomId).emit('output-value-broadcast' , value)
}

const handleLanguageChangeEmit = (socket , language , roomId) => {
    socket.to(roomId).emit('language-change-broadcast' , language)
}

module.exports = {handleEditorValueEmit , handleInputValueEmit, handleOutputValueEmit ,handleLanguageChangeEmit}