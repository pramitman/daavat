import { apiResponse } from "../../common";
import { variantModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require("mongoose").Types.ObjectId

export const add_variant = async(req, res)=>{
    reqInfo(req)
    let body = req.body,{user} = req.headers
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
        const response = await new variantModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("variant"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_variant_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await variantModel.findOneAndUpdate({_id: ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(404).json(new apiResponse(404, responseMessage?.updateDataError("variant"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("variant"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const delete_variant_by_id = async(req, res)=>{
    reqInfo(req)
    let {id} = req.params
    try{
        const response = await variantModel.findOneAndUpdate({_id: ObjectId(id), isDeleted: false}, {isDeleted: true},{new:true})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("variant"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("variant"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_variant = async(req, res) => {
    reqInfo(req)
    let {page, limit, search} = req.body, response:any, match = req.body
    try{
        match.isDeleted = false
        response = await variantModel.find(match)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
          
        const count = response.length
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('variant'), {
            variant_data: response,
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

// export const get_all_variant = async(req, res) => {
//     let response:any, match:any = {}, {page,limit}= req.body

//     try{
//         response = await variantModel.aggregate([
//             {$match:match},
//             {
//                 $lookup:{
//                     from:"products",
//                     let:{productId: "$productId"},
//                     pipeline:[
//                         {
//                             $match:{
//                                 $expr:{
//                                     $and:[
//                                         {$eq: ["$_id", "$$productId"]},
//                                     ],
//                                 },
//                             },
//                         },
//                     ],
//                     as:"product"
//                 }
//             },
            
//             {
//                 $unwind: {path: "$product", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $facet:{
//                     data:[
//                         {$sort : {createdAt: - 1}},
//                         {$skip: (((page as number -1)* limit as number))},
//                         {$limit: limit as number}
//                     ],
//                     data_count: [{ $count: "count" }]
//                 }
//             }
//         ])
//         return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('variant'),{
//             product_data :response[0].data,
//             state:{
//                 page:page as number,
//                 limit: limit as number,
//                 page_limit:Math.ceil(response[0].data_count[0]?.count/(req.body.limit)as number) || 1
//             }
//         },{}))
//     }catch(error){
//         console.log(error);
//         return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error))
//     }
// }

export const get_by_id_variant = async(req, res)=>{
    reqInfo(req)
    let {id}=req.params
    try{
        const response = await variantModel.findOne({_id:ObjectId(id), isDeleted : false})
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.getDataNotFound("variant"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("variant"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}