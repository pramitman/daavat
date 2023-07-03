import { unit } from "../../common";

const mongoose = require('mongoose')

const productSchema: any = new mongoose.Schema({
    name : {type:String},
    price : {type : Number},
    productImage :[{type: String}],
    descripation : {type : String},
    catalogueId  : {type  :  mongoose.Schema.Types.ObjectId, ref:"catlogue"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    isDeleted: {type: Boolean, default: false },
    isBlocked: {type: Boolean, default: false },
}, { timestamps: true })

export const productModel = mongoose.model('product', productSchema);