import * as Joi from "joi"
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { apiResponse } from "../common";

export const add = async(req:Request, res:Response, next:any)=>{
    const schema = Joi.object({
        tabId: Joi.string().required(),
        filter: Joi.string().required()
    }).unknown()
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}))
    })
}

export const update = async(req:Request, res:Response, next:any)=>{
    const schema = Joi.object({
        _id: Joi.string().required(),
        filter: Joi.string()
    }).unknown()
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result._id)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}))
    })
}


export const by_id = async (req: Request, res: Response, next: any) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json(new apiResponse(400, 'invalid id', {}, {}))
    return next()
}