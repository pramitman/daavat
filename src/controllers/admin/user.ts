import { apiResponse, generatePassword, generateUserId } from "../../common";
import { userModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_user = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers,prefix
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        let userId : any = null , password :any ;

        prefix = "U";
        while(!userId){
            let temp = generateUserId(prefix);
            const copy =  await userModel.findOne({uniqueId : temp , isDeleted : false ,role:"agency"});
           if(!copy) userId = temp;
        }
        body.uniqueId = userId;
        if(!body.password) body.password = generatePassword();
        const response = await new userModel(body).save()
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("user"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_user_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await userModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.updateDataError("user"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("user"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_user_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await userModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.getDataNotFound("user"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("user"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_user = async(req, res) => {
    reqInfo(req)
    let {page, limit, search} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false

        response = await userModel.find(match)
        .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
          
            const count = response.length
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('user'), {
                user_data: response,
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

export const get_by_id_user = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await userModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.getDataNotFound("user"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("user"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}