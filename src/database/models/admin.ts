const mongoose = require('mongoose')

const adminSchema: any = new mongoose.Schema({
    name : { type : String  ,required : true},
    email : {type :String},
    phoneNumber :  { type :String},
    password: { type: String },
    isSuperAdmin: {type : Boolean, default:false},
    role : {type :String},
    roleId : {type : mongoose.Schema.Types.ObjectId, ref : 'role', default:null},
    isDeleted: { type: Boolean, default: false },   
    isBlocked: { type: Boolean, default: false },
    isLoggedIn : { type : Boolean , default : false},
    createdBy: { type: mongoose.Schema.Types.ObjectId, default : null},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default : null},
}, { timestamps: true })

export const adminModel = mongoose.model('admin', adminSchema);


