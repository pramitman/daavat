const mongoose = require('mongoose')

const filterSchema: any = new mongoose.Schema({
    filter : {type :String},
    tabId : {type: mongoose.Schema.Types.ObjectId, ref:"tabmaster"},
    isDeleted : {type : Boolean, default : false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'admin'},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref:'admin'},
}, { timestamps: true })

export const filterModel = mongoose.model('filter', filterSchema);