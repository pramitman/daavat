import { apiResponse, generatePassword, generateUserId } from "../../common";
import { orderModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper"

const ObjectId = require('mongoose').Types.ObjectId

export const add_order = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers, prefix
    try{
        body.createdBy = ObjectId(user?._id)
        body.updatedBy = ObjectId(user?._id)
       
        let totalPrice = 0;
        for (const product of body.products) {
          totalPrice = product.price * product.quantity;
        }
        body.total = totalPrice 

        const response = await new orderModel(body).save()
        if(!response) return res.status(400).json(new apiResponse(400, responseMessage?.addDataError,{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("order"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const edit_order_by_id = async(req, res)=>{
    reqInfo(req)
    let body = req.body, {user} = req.headers
    try{
        body.updatedBy = ObjectId(user?._id)
        const response = await orderModel.findOneAndUpdate({_id:ObjectId(body._id), isDeleted:false}, body, {new:true})
        if(!response) return res.status(405).json(new apiResponse(405, responseMessage?.updateDataError("order"),{},{}))
        return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("order"),response,{}))
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const get_all_order = async(req, res) => {
    reqInfo(req)
    let {page, limit, search, salesmanFilter, delieverymanFilter} = req.body, response:any, match = req.body, {user} = req.headers
    console.log("user => ",user);
    try{
        if(salesmanFilter){
            match.salesmanId = ObjectId(salesmanFilter)
            match.delieverymanId = ObjectId(delieverymanFilter);
        }else if(user.role == "salesman"){
            match.salesmanId = ObjectId(user._id);
        }else if(user.role == "deliveryman"){
            match.delieverymanId = ObjectId(user._id);
        }
        match.isDeleted = false
        console.log("match => ",match);
        const populate = [
            {
                path: "agencyId"
            },{
                path:"salesmanId"
            },{
                path:"shopId"
            },{
                path:"delieverymanId"
            },{
                path:"products.productId"
            }]
        response = await orderModel.find(match)
        .populate(populate)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
          
            const count = response.length
            return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess('order'), {
                order_data: response,
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