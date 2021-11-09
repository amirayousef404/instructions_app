// To used express
const express = require('express')

// Store express router to used
const router = express.Router()

// Auths
const auth = require('../middleware/auth')

// Instruction controllers
const instructionController = require('../controllers/instructions.controller')

// Replay on the users (add instructions)
router.post(
    '/api/admin/addInstruction',
    auth.adminAuth,
    instructionController.uploadFile.single('fileName'),
    instructionController.addInstruction
)

// Show all instructions
router.post('/api/admin/showInstructions', auth.adminAuth, instructionController.showAllInstructions)

// Show all instructions for user (by user)
router.post('/api/user/showInstruction', auth.userAuth, instructionController.showAllInstructionsUser)

// Show all instructions for one user
router.get('/api/admin/showInstructionsUser/:id', auth.adminAuth, instructionController.showAllInstructionsForUser)

// Show single instruction
router.get('/api/admin/showSingleInstruction/:id', auth.adminAuth, instructionController.showSingleInstruction)

// Edit single instruction
router.patch(
    '/api/admin/editSingleInstruction/:id',
    auth.adminAuth,
    instructionController.uploadFile.single('fileName'),
    instructionController.editSingleInstruction
)

// Delete single instruction
router.delete(
    '/api/admin/deleteSingleInstruction/:id',
    auth.adminAuth,
    instructionController.deleteSingleInstruction
)

// To export router
module.exports = router