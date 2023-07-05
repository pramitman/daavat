import { agencyRole } from "../../common";

const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({
    name : {type : String},
    area : {type : String},
    gst : {type : String},
    image : [{type : String}],
    contact : {type : String},
    uniqueId : {type : String},
    password : {type : String},
    role: {type : String, enum : agencyRole},
    roleId : {type : mongoose.Schema.Types.ObjectId, ref : "role"},
    isDeleted : {type  :Boolean , default : false},
    isBlocked : {type  :Boolean , default : false},
    createdBy: {type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    updatedBy:{type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    
}, { timestamps: true })

export const agencyModel = mongoose.model('agency', agencySchema);