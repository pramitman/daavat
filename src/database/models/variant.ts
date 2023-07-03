import { unit } from "../../common";

const mongoose = require('mongoose')

const variantSchema: any = new mongoose.Schema({
    name : {type  : String},
    price : {type : Number},
    quantity : {type : String},
    unit : {type : String, enum: unit},
    productId : {type: mongoose.Schema.Types.ObjectId, ref:'product'},
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

}, { timestamps: true })

export const variantModel = mongoose.model('variant', variantSchema);