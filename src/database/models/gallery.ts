const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    descripation : {type : String},
    image: {type:String},
    isDeleted : {type  :Boolean , default : false},
    isBlocked : {type : Boolean, default : false},
    createdBy: {type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    updatedBy:{type : mongoose.Schema.Types.ObjectId, ref:"admin"},
    
}, { timestamps: true })

export const galleryModel = mongoose.model('gallery', gallerySchema);