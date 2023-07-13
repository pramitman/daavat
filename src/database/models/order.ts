import { status, unitType } from "../../common";

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products : [
        {
            productId: {type : mongoose.Schema.Types.ObjectId, ref:"product"},
            price: {type : String},
            quantity : {type : String},
            unitType : {type : String, enum: unitType},
        }
    ],
    total: {type : String},
    gst: {type : String},
    agencyId: {type : mongoose.Schema.Types.ObjectId, ref:"agency"},
    salesmanId: {type : mongoose.Schema.Types.ObjectId, ref:"user"},
    shopId: {type : mongoose.Schema.Types.ObjectId, ref:"shop"},
    delieverymanId: {type : mongoose.Schema.Types.ObjectId, ref:"user", default : null},
    status: {type : String, enum: status, default : "pending"},
    isDeleted : {type  :Boolean , default : false},
    isBlocked : {type : Boolean, default : false},
    createdBy: {type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    updatedBy:{type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    
}, { timestamps: true })

export const orderModel = mongoose.model('order', orderSchema);