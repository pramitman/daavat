import { unit } from "../../common";

const mongoose = require('mongoose')

const variantSchema: any = new mongoose.Schema({
    name : {type  : String},
    quantity : {type : String},
    unit : {type : String, enum: unit},
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    
}, { timestamps: true })

export const variantModel = mongoose.model('variant', variantSchema);