import { apiResponse, generatePassword, generateUserId, generate_otp } from "../../common";
import jwt from 'jsonwebtoken'
import { reqInfo, responseMessage } from "../../helper"
import { shopModel } from "../../database";

const jwt_token_secret = process.env.JWT_TOKEN_SECRET
const ObjectId = require('mongoose').Types.ObjectId

export const add_shop = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers,prefix
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        let shopId : any = null , password :any, isExist
        
        isExist = await shopModel.findOne({contact : body.contact})
        if(isExist && isExist.isDeleted == true){
            return res.status(405).json(new apiResponse(405, "Your Shop Account Is Deleted", {}, {}))
        }
        if(isExist && isExist.isBlocked == true){
            return res.status(405).json(new apiResponse(405, "Your Shop Account Is Blocked", {}, {}))
        }
        // if(isExist) return res.status(405).json(new apiResponse(405,"This Contact number already Exist",{},{}))

        const otp = await generate_otp();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        body.otp = otp
        body.otpExpireTime = otpExpiry

        if(isExist && isExist.isMobileValid == true){
            return res.status(405).json(new apiResponse(405, "This phone number is alraedy exist", {}, {}))
        }

        if(isExist && isExist.isMobileValid == false){
            console.log("isExist => ", isExist);
            const data ={
                ...body,
                otp:otp,
                otpExpiry : otpExpiry
            }
            const shopUpdate = await shopModel.findOneAndUpdate({_id:ObjectId(isExist._id), isDeleted : false, isBlocked : false}, data, {new:true})
            return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess('shop'),shopUpdate,{}))
        }
        
        prefix = "S";
        while(!shopId){
            let temp = generateUserId(prefix);
            const copy =  await shopModel.findOne({uniqueId : temp , isDeleted : false});
           if(!copy) shopId = temp;
        }
        body.uniqueId = shopId;
        if(!body.password) body.password = generatePassword();
        const response = await new shopModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("shop"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_shop_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await shopModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError("shop"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("shop"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_shop_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await shopModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("shop"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("shop"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_shop = async(req, res) => {
    reqInfo(req)
    let {page, limit, search,areaFilter, area} = req.body, response:any, match = req.body, {user} = req.headers
    try{
        if(user.role == "salesman"){
            match.areaCode = {$in: areaFilter}
        }
        if(areaFilter) match.areaCode = {$in:areaFilter} 
        match.isDeleted = false
        console.log("match => ",match);
        response = await shopModel.find(match)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
          
            const count = response.length
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('shop'), {
                shop_data: response,
                state: {
                    page: page ,
                    limit: limit ,
                    page_limit: Math.ceil(count / limit) || 1,
                }
            }, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_by_id_shop = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await shopModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("shop"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("shop"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const verifyOtp = async(req, res) =>{
    let {otp, shopId} = req.body
    try{
        let shop = await shopModel.findOne({_id:ObjectId(shopId), isDeleted:false, isBlocked : false})
        if(!shop) return res.status(405).json(new apiResponse (405, responseMessage?.getDataNotFound(''), {}, {}))
        else if(otp != shop.otp){
            return res.status(405).json(new apiResponse(405, "otp is not valid", {}, {}))
        }
        if(new Date(shop.otpExpireTime)<new Date())
        return res.status(405).json(new apiResponse(405,"otp is expired",{},{}))

        let updatedUser = await shopModel.findOneAndUpdate({ _id: ObjectId(shopId) }, { $set: { otp: null , otpExpiry : null , isMobileValid : true } }, {new:true});
        let response = updatedUser

        response.token = jwt.sign({
            id:ObjectId(shop._id),
            role:shop.role || "shop"
        },jwt_token_secret)

        return res.status(200).json(new apiResponse(200, responseMessage?.OTPverified, response,{}))
    }catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const resendOtp = async (req, res, next) => {
    const {  shopId  } = req.body;
    try {
     
        let user;
        user = await shopModel.findOne({ _id: ObjectId(shopId), isDeleted : false, isBlocked :false });
        console.log("user => ", user);
        if (!user) return res.status(405).json(new apiResponse(405, responseMessage?.getDataNotFound('shop'), {}, {}))
        if (user.isDeleted) {
            return res.status(405).json(new apiResponse(405, "Your Shop Account Is Deleted", {}, {}))
        }
        if (user.isBlocked) {
            return res.status(405).json(new apiResponse(405, "Your Shop Account Is Blocked", {}, {}))
        }
        let otp =  await generate_otp();
        let response = await shopModel.findOneAndUpdate({ _id: user._id }, { $set: { otp: otp , otpExpiry : new Date(Date.now() + 10 * 60 * 1000) } }, {});
       //send mobile otp function
    //    await twilioService.send_sms(user?.contact?.countryCode,user?.contact?.mobileNumber, `${messages[lang].DF_MOBILE_VERIFICATION} ${otp}`);
        response = {
        otp : otp
       }
        return res.status(200).json(new apiResponse(200, "Otp send Successfully",response,{}))
    } catch (error) {
        next(error);
    }
};