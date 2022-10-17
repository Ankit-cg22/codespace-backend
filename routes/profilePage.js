const router = require('express').Router()

// controllers  
const { getProfileInfo, handleSaveSnippet, handleDeleteSnippet, handleUpdateSnippet } = require('../controllers/profilePage')

// middleware
const authorization = require('../middleware/authorization')

// authorize
router.get('/' , authorization , getProfileInfo)

// create snippet
router.post('/save-snippet' , handleSaveSnippet)

// update snippet
router.put('/update-snippet/:id' , handleUpdateSnippet)

// delete snippet
router.delete('/delete-snippet/:id' , handleDeleteSnippet)

module.exports = router