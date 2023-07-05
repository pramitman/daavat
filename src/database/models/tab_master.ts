const mongoose = require('mongoose')

const tabMasterSchema: any = new mongoose.Schema({
    tabName :{type : String },
    displayName : {type : String, default: null},
    tabUrl: {type:String},
    hasView : {type : Boolean, default : false},
    hasAdd : { type : Boolean, default : false},
    hasEdit : { type : Boolean, default : false},
    hasDelete : { type : Boolean, default : false},
    isDeleted : {type  :Boolean , default : false},
    parentId: {type: mongoose.Schema.Types.ObjectId, default:null, ref:"tabmaster"},
    filters: [{type: mongoose.Schema.Types.ObjectId, default:null, ref:"filter"}],
}, { timestamps: true })

export const tabMasterModel = mongoose.model('tabmaster', tabMasterSchema);