const router = require('express').Router();
const { handleCompile, handleCreateRoom, handleJoinRoom } = require('../controllers/userActions');

router.post('/compile' , handleCompile)

router.get('/createRoom' , handleCreateRoom)

router.post('/join-room' ,handleJoinRoom)

module.exports = router;