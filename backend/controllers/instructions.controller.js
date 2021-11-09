// Requires
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Instructions = require('../database/models/instructions.model')
const User = require('../database/models/user.model')

let fileName = ''
let errorExt = ''

// Uplaoded file
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads') },
    filename: function (req, file, cb) {
        fileName = `${Date.now()}.${(file.originalname.split('.').pop())}`
        cb(null, fileName)
    }
})
const uploadFile = multer({ storage })

// Replay on the users (add instruction) (by admin)
const addInstruction = async (req, res) => {
    try {
        let user = await User.findById(req.body.user_id)
        if (!user) throw new Error(`User not founded`)
        let instruction = new Instructions({ ...req.body })
        if (req.file.mimetype !== 'image/gif') throw new Error(`Please upload a file type of gif`)

        instruction.fileName = fileName
        
        await instruction.save()
        res.status(200).send({
            apiStatus: true,
            success: instruction,
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

// Show all instructions (by admin)
const showAllInstructions = async (req, res) => {
    try {
        let instruction = await Instructions.find()
        if (instruction == '') throw new Error(`Data not founded, Please insert any data`)

        res.status(200).send({
            apiStatus: true,
            success: instruction,
            message: `All data for users`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Not found! Check data`
        })
    }
}

// Show all instructions for one user (by admin)
const showAllInstructionsForUser = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Instructions.find({ user_id: id })
        if (data == '') throw new Error(`The instructions not found`)
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Instructions this user`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Not found data!`
        })
    }
}

// Show all instructions for you (by user)
const showAllInstructionsUser = async (req, res) => {
    try {
        await req.user.populate({
            path: 'instructionUser',
        }).execPopulate()
        let data = req.user.instructionUser
        if (data == '') throw new Error(`No instructions`)
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Instructions this user`
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

// Show single instruction (by admin)
const showSingleInstruction = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Instructions.findById(id)
        if (!data) throw new Error(`The instructions not found`)

        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `this single instruction`
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

// Edit single instruction (by admin)
const editSingleInstruction = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Instructions.findById(id)
        if (!data) throw new Error(`The instruction not found`)

        let objkeys = Object.keys(req.body)
        if (objkeys.length == 0) throw new Error(`Please insert data`)

        let allowUpdate = ['title', 'description', 'fileName']
        let validUpdate = objkeys.every(instruct => allowUpdate.includes(instruct))

        if (!validUpdate) throw new Error(`Allowed update ${allowUpdate} only`)
        
        if (req.file.mimetype !== 'image/gif') throw new Error(`Please upload a file type of gif`)

        let oldFileName = data.fileName
        
        data.fileName = fileName
        objkeys.forEach(instruct => data[instruct] = req.body[instruct])

        fs.unlink(`uploads/${oldFileName}`, (error) => { if (error)`Error file` })

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

// Delete single instruction (by admin)
const deleteSingleInstruction = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Instructions.findByIdAndDelete(id)

        if (!data) throw new Error(`The instruction not found`)
        fs.unlink(`uploads/${data.fileName}`, (error) => { if (error)`Error file` })
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Deleted Done`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Can't delete`
        })
    }
}

// Exports
module.exports = {
    uploadFile,

    addInstruction,

    showAllInstructions,
    showAllInstructionsForUser,
    showAllInstructionsUser,

    showSingleInstruction,

    editSingleInstruction,

    deleteSingleInstruction
}