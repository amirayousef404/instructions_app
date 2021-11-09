// Requires
const User = require('../database/models/user.model')
const UserInfo = require('../database/models/userInfo.model')
const Instructions = require('../database/models/instructions.model')

const Token = require("../database/models/token.model")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

// Register users
const userRegister = async (req, res) => {
    try {
        let data = new User(req.body)
        await data.save()
        res.status(200).send({
            status: true,
            success: data,
            message: `Congratulations! to register`
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: `Check data to register`
        })
    }
}

// Login user
const userLogin = async (req, res) => {
    try {
        let user = await User.logMeOn(req.body.email, req.body.password)
        let token = await user.generateAuthToken()
        // let referenceID = Math.floor((Math.random() * 10)  * Date.now()).toString().slice(0, 8)
        // user.referenceId = referenceID
        // if(!user.referenceId) 
        // console.log(user.referenceId)
        let uniqeId = user._id.toString()
        let referenceUniqeId = uniqeId.substring(uniqeId.length, uniqeId.length - 8)
        user.referenceId = referenceUniqeId
        res.status(200).send({
            status: true,
            success: { token, user },
            message: "Logged in success"
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: "Check! email or password"
        })
    }
}

// Show all users
const showAllUser = async (req, res) => {
    try {
        let allUsers = await User.find({ userType: 'user' })
        if (!allUsers) throw new Error()
        res.status(200).send({
            status: true,
            success: allUsers,
            message: "All users"
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: 'There are no users'
        })
    }

}

// Show single user
const showSingleUser = async (req, res) => {
    try {
        let user_id = req.params.id
        let showUser = await User.findById(user_id)
        if (!showUser) throw new Error()
        res.status(200).send({
            apiStatus: true,
            success: showUser,
            message: `Data of single user`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `There is no data`
        })
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        await Instructions.deleteMany({ user_id: req.user._id })
        await UserInfo.deleteMany({ user_id: req.user._id })
        res.status(200).send({
            apiStatus: true,
            message: `Deleted Done`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Can't delete`
        })
    }
}

// Delete users by admin
const deleteUserByAdmin = async (req, res) => {
    try {
        let id = req.params.id
        if (id == req.user._id) throw new Error(`Your admin can't delete your self`)
        let data = await User.findByIdAndDelete(id)
        if (!data) throw new Error(`Data not founded of user`)
        await Instructions.deleteMany({ user_id: id })
        await UserInfo.deleteMany({ user_id: id })
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Deleted Done`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Can't delete`
        })
    }
}

// Log out from one place
const logOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => ele.token != req.token)
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out'
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error.message,
            message: 'error'
        })
    }
}

// Log out from all places
const logOutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out all'
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error.message,
            message: 'error'

        })
    }
}

// Forget password by user
const forgetPasswordUser = async (req, res) => {
    try {
        // const schema = Joi.object({ email: Joi.string().email().required() });
        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).send("user with given email doesn't exist")

        let token = await Token.findOne({ user_id: user._id })
        if (!token) {
            token = await new Token({
                user_id: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "Password reset", link)

        res.send("password reset link sent to your email account")
    } catch (error) {
        res.send("An error occured ....")
    }
}

// Reset password by user
const resetPasswordUser = async (req, res) => {
    try {
        // const schema = Joi.object({ password: Joi.string().required() })
        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findById(req.params.user_id)
        if (!user) return res.status(400).send("invalid link or expired")
        
        const token = await Token.findOne({
            user_id: user._id,
            token: req.params.token,
        })
        if (!token) return res.status(400).send("Invalid link or expired")

        user.password = req.body.password
        await user.save()
        await token.delete()

        res.send("password reset sucessfully.")
    } catch (error) {
        res.send("An error occured")
    }
}


// Exports
module.exports = {
    userRegister,
    userLogin,

    showAllUser,
    showSingleUser,
    deleteUser,

    deleteUserByAdmin,

    forgetPasswordUser,
    resetPasswordUser,

    logOut,
    logOutAll
}

