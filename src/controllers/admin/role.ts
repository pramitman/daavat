import { apiResponse } from "../../common";
import { roleModel } from "../../database/models/role";
import { roleDetailsModel } from "../../database/models/role_details";

import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_role = async(req, res) =>{
    reqInfo(req)
    let body = req.body, {roleDetails}=req.body, {user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        const isExit = await roleModel.findOne({name : body.name, isDeleted: false})
        if(isExit) return res.status(405).json(new apiResponse(405, "This name already Exist",{},{}))

        const response = await new roleModel(body).save()

        const roleId = response._id
        for(let roledet of roleDetails){
            roledet.roleId = roleId
            await new roleDetailsModel(roledet).save();
        }
        
        if(!response)return res.status(404).json(new apiResponse(404, responseMessage?.addDataError, {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess('role'), response, {}))

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_role_by_id = async(req, res) =>{
    reqInfo(req)
    let body = req.body, {rolePermissions} = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await roleModel.findOneAndUpdate({_id: ObjectId(body._id), isDeleted:false}, body, {new : true})

        for(let rolePe of rolePermissions){
            let roleDetails = await roleDetailsModel.findOne({tabId:ObjectId(rolePe.tabId), roleId:ObjectId(body._id), isDeleted:false})
            if(!roleDetails){
                const obj = {roleId:ObjectId(body._id), ...rolePe}
                roleDetails = await new roleDetailsModel(obj).save()
            }else{
                roleDetails = await roleDetailsModel.updateOne({tabId : ObjectId(rolePe.tabId), isDeleted:false}, rolePe, {new:true})   
            }
        }
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError('role'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess('role'), response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_role_by_id = async(req, res) => {
    reqInfo(req)
    let body = req.body, {id} = req.params
    try{
        const response = await roleModel.findOneAndUpdate({_id: ObjectId(id), isDeleted: false}, {isDeleted:true}, {new: true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound('role'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess('role'), {}, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_role = async(req, res) => {
    reqInfo(req)
     let {page, limit, search,isAdminRole} = req.body, match:any = {}, response:any
    try{
        match.isDeleted =  false
        if (isAdminRole || isAdminRole == false) match.isAdminRole = isAdminRole;
      
        response= await roleModel.find(match).populate({path: "createdBy",select: "name"}).populate({path:'updatedBy', select:'name'})
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        const count = response.length

        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('role'), {
            // user_data: response[0].data,
            role_data: response,
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

export const get_role_by_id =async(req, res) => {
    let {id} = req.params
    try{
        const response = await roleModel.findOne({_id:ObjectId(id), isDeleted:false})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound('role'), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('role'), response, {}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}