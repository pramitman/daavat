import { userRole } from "../../common";

const mongoose = require('mongoose')

const userSchema: any = new mongoose.Schema({
    name : {type  : String},
    uniqueId : {type : String},
    password : {type : String},
    role : {type : String, enum : userRole},
    agencyId : {type : mongoose.Schema.Types.ObjectId, ref:"agency"},
    roleId: {type : mongoose.Schema.Types.ObjectId, ref:"role"},
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isLoggedIn : { type : Boolean , defailt : false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},

}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema);