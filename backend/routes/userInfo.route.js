// To used express
const express = require('express')

// Store express router to used
const router = express.Router()

// Auths
const auth = require('../middleware/auth')

// userInfo controllers
const userInfoController = require('../controllers/userInfo.controllr')

// add user Info 
router.post(
    '/api/user/addUserInfo',
    auth.userAuth,
    userInfoController.addUserInfo
)

// Edit user info (by user)
router.patch('/api/user/editSingleInfo/:id', auth.userAuth, userInfoController.editSingleInfo)

// Show single user info (by user)
router.get('/api/user/showSingleInfo/:id', auth.userAuth, userInfoController.showSingleInfo)

// Show all user Info (by user)
router.post('/api/user/showAllUserInfoByUser', auth.userAuth, userInfoController.showAllUserInfoByUser)

// Show all user info (by admin)
router.get('/api/admin/showAllUserInfoByAdmin/:id', auth.adminAuth, userInfoController.showAllUserInfoByAdmin)

// To export router
module.exports = router