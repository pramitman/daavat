import { unit } from "../../common";

const mongoose = require('mongoose')

const productSchema: any = new mongoose.Schema({
    name : {type:String},
    price : {type : Number},
    productImage :[{type: String}],
    descripation : {type : String},
    isPcsForSell : {type : Boolean, default : false},
    cartoonPrice : {type : Number},
    pcsPrice : {type : Number},
    cartoonUnit:{type : String},
    variantId : {type: mongoose.Schema.Types.ObjectId, ref:"variant"},
    isDeleted: {type: Boolean, default: false },
    isBlocked: {type: Boolean, default: false },
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},
}, { timestamps: true })

export const productModel = mongoose.model('product', productSchema);