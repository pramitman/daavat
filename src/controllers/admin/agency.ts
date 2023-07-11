import { apiResponse, generatePassword, generateUserId } from "../../common";
import { agencyModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_agency = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers, prefix
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        let userId : any = null , password :any ;

            prefix = "AG";
        while(!userId){
            let temp = generateUserId(prefix);
            const copy =  await agencyModel.findOne({uniqueId : temp , isDeleted : false, role:"agency"});
           if(!copy) userId = temp;
        }
        body.uniqueId = userId;
        if(!body.password) body.password = generatePassword();
        const response = await new agencyModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("agency"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_agency_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await agencyModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.updateDataError("agency"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("agency"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_agency_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await agencyModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("agency"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("agency"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_agency = async(req, res) => {
    reqInfo(req)
    let {page, limit, search} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false

        response = await agencyModel.find(match)
        .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
          
            const count = response.length
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('agency'), {
                agency_data: response,
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

export const get_by_id_agency = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await agencyModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("agency"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("agency"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}