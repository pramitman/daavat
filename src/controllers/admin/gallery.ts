import { apiResponse } from "../../common";
import { galleryModel } from "../../database/models/gallery";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_gallery = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        const response = await new galleryModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("gallery"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_gallery_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await galleryModel.findOneAndUpdate({_id:ObjectId(body?._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError("gallery"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("gallery"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_gallery_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await galleryModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("gallery"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("gallery"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_gallery = async(req, res) => {
    reqInfo(req)
    let {page, limit, search} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false

        response = await galleryModel.find(match)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
              
        const count = response.length
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('gallery'), {
            gallery_data: response,
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

export const get_by_id_gallery = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await galleryModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("product"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}