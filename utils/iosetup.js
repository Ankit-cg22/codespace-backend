const editorIoHandler = require('../routes/editorIo')
const boardIoHandler = require('../routes/boardIo')
const roomHandler = require('../routes/room');
const pool = require('../db');
const checkIfValidUUID = require('../utils/uuidChecker')

const onConnection = (io , socket) => {
    editorIoHandler(io , socket)
    boardIoHandler(io , socket)
    roomHandler(io  ,socket)
    socket.emit('connected')
    socket.on("disconnecting", async () => {
        var socketRooms = Array.from(socket.rooms); 
        // console.log(socket.rooms)
        const rooms = io.of("/").adapter.rooms
        socketRooms.map(async(sr)=>{ 
            let sz = rooms.get(sr).size;
            // console.log(sz)
            
            if(sz === 1)
            {
                try {
                    if(!checkIfValidUUID(sr))return 
                    await pool.query(
                        'DELETE FROM rooms WHERE room_id = $1' ,
                        [sr]
                    )
                    console.log(`deleted room ${sr}`)
                } catch (error) {
                    console.log(error.message)
                }
                
            }

        })
    });
    
}

module.exports = {onConnection}