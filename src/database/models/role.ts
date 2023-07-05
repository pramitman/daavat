import { roleTypes } from "../../common";

const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name : {type : String, enum : roleTypes},
    isAdminRole:{type: Boolean, default : false},
    isDeleted : {type  :Boolean , default : false},
    createdBy: {type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    updatedBy:{type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    
}, { timestamps: true })

export const roleModel = mongoose.model('role', roleSchema);