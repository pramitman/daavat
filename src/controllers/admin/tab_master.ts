import { apiResponse } from "../../common";
import { filterModel } from "../../database/models/filter";
import { tabMasterModel } from "../../database/models/tab_master";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_tab_master = async(req, res) =>{
    reqInfo(req)
    let body = req.body, {tabFilters} = req.body, response:any, {user} = req.headers
    try{
  
        const newFilter =[]
        if(body.parentId)body.parentId = ObjectId(body.parentId)
        response = await new tabMasterModel(body).save()
        const tabId = response._id
        for(let filter of tabFilters){
            let fi = await filterModel.create({filter:filter, tabId: tabId})
            newFilter.push(ObjectId(fi._id))
        }
         response.filters = newFilter
         response = await response.save()

        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("tab master"),response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_tab_master_by_id = async(req, res) => {
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        if(body?.filters) 
        {
            for(let i =0 ; i < body.filters.length ; i ++)
            {
                let fi = body.filters[i];

                fi = ObjectId(fi)
            }
        }
        const response = await tabMasterModel.findOneAndUpdate({_id: ObjectId(body._id), isDeleted:false}, body, {new: true})
        
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError('tab msater'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess('tab master'), response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_tab_master_by_id = async(req, res) =>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await tabMasterModel.findOneAndUpdate({_id:ObjectId(id), isDeleted:false}, {isDeleted:true}, {new:true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound('tab master'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess('tab Master'), {}, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_tab_master = async(req, res) =>{
    reqInfo(req)
    let response:any, {page,limit} = req.body, match: any = {}
    try{
        match.isDeleted =  false
        response= await tabMasterModel.find(match).populate('filters')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        const count = response.length

        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('tab master'), {
            // user_data: response[0].data,
            tab_master_data: response,
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

export const get_tab_master_by_id = async(req, res) =>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await tabMasterModel.findOne({_id:ObjectId(id), isDeleted:false}).populate('filters')
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound('tab master'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('tab master'), response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}