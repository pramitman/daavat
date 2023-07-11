import { apiResponse } from "../../common";
import { filterModel } from "../../database";
import { tabMasterModel } from "../../database/models/tab_master";

import { reqInfo, responseMessage } from "../../helper";

const ObjectId = require('mongoose').Types.ObjectId

export const add_filter = async(req,res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        body.tabId = ObjectId(body.tabId)
        const response = await new filterModel(body).save();

        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        const updatedtab = await tabMasterModel.findOneAndUpdate({_id: body.tabId}, {$push:{filters:ObjectId(response._id)}},{new:true})

        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("filter"),updatedtab,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError,{},error))
    }
}

export const edit_filter_by_id =async (req, res) => {
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await filterModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new : true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError("filter"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("filter"), {} ,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_filter_by_tabId = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {id} = req.params
    try{
        const response = await filterModel.findOne({tabId: ObjectId(id), isDeleted: false})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound('filter'),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("filter"),response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}