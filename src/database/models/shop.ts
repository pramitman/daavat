import { roleTypes } from "../../common";

const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name : {type : String},
    ownerName : {type : String},
    contact : {
        countryCode : {type : String},
        mobile : {type: String}
    },
    uniqueId : {type : String},
    password : {type : String},
    areaCode : {type : String},
    shopPhoto:{type: String},
    address : {
        addressLine: {type : String},
        latitude : {type : String},
        longitude :  {type : String},
    },
    otp:{type : String},
    otpExpireTime: {type: Date, default: null },
    role : {type : String, enum:roleTypes},
    roleId : {type : mongoose.Schema.Types.ObjectId, ref:"role"},
    isMobileValid:{type: Boolean, default : false},
    isDeleted : {type  :Boolean , default : false},
    isBlocked : {type  :Boolean , default : false},
    createdBy: {type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    updatedBy:{type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    
}, { timestamps: true })

export const shopModel = mongoose.model('shop', shopSchema);