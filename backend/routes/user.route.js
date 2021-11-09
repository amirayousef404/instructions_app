// To used express
const express = require('express')

// Store express router to used
const router = express.Router()


// User controllers
const userController = require('../controllers/user.controller')

// Auths
const auth = require('../middleware/auth')


// Register user
router.post('/api/user/register', userController.userRegister)

// login  user
router.post('/api/user/login', userController.userLogin)

// Show all user by admin
router.post('/api/admin/all', auth.adminAuth, userController.showAllUser)

// Show single user
router.get('/api/admin/single/:id', auth.adminAuth, userController.showSingleUser)

// delete your self (user)
router.delete('/api/user/delete', auth.userAuth, userController.deleteUser)

// delete users by admin
router.delete('/api/admin/delUser/:id', auth.adminAuth, userController.deleteUserByAdmin)

// logout any user or admin
router.post('/api/user/logout', auth.generalAuth, userController.logOut)

router.post('/api/user/logoutAll', auth.generalAuth, userController.logOutAll)

// Forget password for user
router.post("/api/password-reset", userController.forgetPasswordUser)

// Reset password for user
router.post("/:user_id/:token", userController.resetPasswordUser)

// To export router
module.exports = router