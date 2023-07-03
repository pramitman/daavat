import { unit } from "../../common";

const mongoose = require('mongoose')

const catlogueSchema: any = new mongoose.Schema({
    beverges : {type: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    isDeleted: {type: Boolean, default: false },
    isBlocked: {type: Boolean, default: false },
}, { timestamps: true })

export const catlogueModel = mongoose.model('catlogue', catlogueSchema);