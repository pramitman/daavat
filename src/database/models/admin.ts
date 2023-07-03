
const mongoose = require('mongoose')

const adminSchema: any = new mongoose.Schema({
    name : { type : String  ,required : true},
    email : {type :String},
    phone :  { type :String},
    password: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default : null},
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isLoggedIn : { type : Boolean , default : false},
}, { timestamps: true })

export const adminModel = mongoose.model('admin', adminSchema);


