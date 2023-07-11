
const mongoose = require('mongoose')

const catalogueSchema: any = new mongoose.Schema({
    name: {type: String},
    image: [{type: String}],
    variants: {type: Array},
    isDeleted: {type: Boolean, default: false },
    isBlocked: {type: Boolean, default: false },
    createdBy: {type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, default : null},
}, { timestamps: true })

export const catalogueModel = mongoose.model('catalogue', catalogueSchema);