const mongoose = require('mongoose')

const roleDetailsSchema: any = new mongoose.Schema({
    tabId :{type : mongoose.Schema.Types.ObjectId , ref : "tabmaster"},
    roleId : {type : mongoose.Schema.Types.ObjectId, ref: "role"},
    filters : [
        {
           id: {type : mongoose.Schema.Types.ObjectId, ref: "filter"},
           hasAccess : {type: Boolean, default : true},
        }
    ],
    view : { type : Boolean, default : true},
    add : { type : Boolean, default : false},
    edit : { type : Boolean, default : false},
    delete : {type : Boolean, default : false},
    isDeleted : {type  :Boolean , default : false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'admin'},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref:'admin'},
}, { timestamps: true })

export const roleDetailsModel = mongoose.model('roleDetail', roleDetailsSchema);