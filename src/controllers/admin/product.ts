import { apiResponse } from "../../common";
import { productModel } from "../../database/models/product"
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_product = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        const response = await new productModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_product_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await productModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError("product"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_product_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await productModel.findOneAndUpdate({_id:ObjectId(id), isDeleted: false}, {isDeleted: true}, {new:true})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("product"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_product = async(req, res) => {
    reqInfo(req)
    let {page, limit, search, variantFilter} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false
        if(variantFilter) match.variantId = variantFilter
        const populate = [{path:"variantId"}]
        response = await productModel.find(match).populate(populate)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
          
        const count = response.length
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('product'), {
            product_data: response,
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

export const get_by_id_product = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        let response = await productModel.findOne({_id:ObjectId(id), isDeleted : false}).lean()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("product"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("product"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}