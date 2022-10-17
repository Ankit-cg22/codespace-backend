const router = require('express').Router()

//middlewares
const validator = require('../middleware/validator')
const authorization = require('../middleware/authorization')

//controllers
const {handleRegister, handleLogin, handleVerification} = require('../controllers/auth')

//register
router.post('/register' , validator , handleRegister )

// login
router.post('/login' ,validator , handleLogin)

// verification
router.get('/isVerified' ,authorization , handleVerification)

module.exports = router 
