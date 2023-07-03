import { apiResponse } from "../../common";
import { catlogueModel } from "../../database/models/catlogue ";
import { productModel } from "../../database/models/product";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_catlogue = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        const response = await new catlogueModel(body).save()
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("catlogue"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_catlogue_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await catlogueModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.updateDataError("catlogue"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("catlogue"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_catlogue_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await catlogueModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.getDataNotFound("catlogue"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("catlogue"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_catlogue = async(req, res) => {
    reqInfo(req)
    let {page, limit, search} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false

        response = await catlogueModel.find(match)
        .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
          
            const count = response.length
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('catlogue'), {
                catlogue_data: response,
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

export const get_by_id_catlogue = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await catlogueModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.getDataNotFound("product"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}