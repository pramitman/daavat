var mongoose = require('mongoose')
// import mongoose from 'mongoose'
const userSessionSchema = new mongoose.Schema({
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    refresh_token: { type: String }
}, { timestamps: true })

export const userSessionModel = mongoose.model('user_session', userSessionSchema)

