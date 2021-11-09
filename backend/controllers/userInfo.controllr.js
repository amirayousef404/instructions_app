// Requires
const UserInfo = require('../database/models/userInfo.model')
const User = require('../database/models/user.model')

// add user info (by user)
const addUserInfo = async (req, res) => {
    try {

        let userInfo = new UserInfo({
            ...req.body,
            'user_id': req.user._id
        })

        await userInfo.save()
        res.status(200).send({
            apiStatus: true,
            success: userInfo,
            message: `Data inserted`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert`
        })
    }
}

// Edit single information (by user)
const editSingleInfo = async (req, res) => {
    try {
        let id = req.params.id
        let data = await UserInfo.findById(id)
        if (!data) throw new Error(`The information not found`)
        if(req.user._id.toString() !== data.user_id.toString()) throw new Error (`Can't edit information`)
        
        let objkeys = Object.keys(req.body)
        if (objkeys.length == 0) throw new Error(`Please insert data`)

        let allowUpdate = ['gender', 'height', 'weight', 'age', 'notes']
        let validUpdate = objkeys.every(info => allowUpdate.includes(info))

        if (!validUpdate) throw new Error(`Allowed update ${allowUpdate} only`)

        objkeys.forEach(info => data[info] = req.body[info])

        await data.save()
        res.status(200).send({
            apiStatus: true,
            message: `Updated success`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to update`
        })
    }
}

// Show single information (by user)
const showSingleInfo = async (req, res) => {
    try {
        let id = req.params.id
        let data = await UserInfo.findById(id)
        if (!data) throw new Error(`The information not found`)
        if(req.user._id.toString() !== data.user_id.toString()) throw new Error (`Can't show this information`)

        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `this single information`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data! to show`
        })
    }
}

// Show showAllUserInfoByUser (by user)
const showAllUserInfoByUser = async (req, res) => {
    try {
        await req.user.populate({
            path: 'userInformation',
        }).execPopulate()
        let data = req.user.userInformation
        if (data == '') throw new Error(`No user informations`)
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Information this user`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data!`
        })
    }
}

// Show single UserInfo (by admin)
const showAllUserInfoByAdmin = async (req, res) => {
    try {
        let id = req.params.id
        let userInfo = await UserInfo.find({user_id: id})
        if (!userInfo) throw new Error(`The user information not found`)

        res.status(200).send({
            apiStatus: true,
            success: userInfo,
            message: `This single user information`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data! to show`
        })
    }
}

// Exports
module.exports = {
    addUserInfo,
    editSingleInfo,
    showSingleInfo,
    showAllUserInfoByUser,
    showAllUserInfoByAdmin
}
