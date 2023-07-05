import * as Joi from "joi"
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { apiResponse } from "../common";

export const add = async(req:Request, res:Response, next:any)=>{
    const schema = Joi.object({
        tabName : Joi.string().required(),
        displayName: Joi.string().allow(null),
        tabUrl : Joi.string().required(),
        hasView: Joi.boolean().default(false),
        hasAdd: Joi.boolean().default(false),
        hasEdit: Joi.boolean().default(false),
        hasDelete: Joi.boolean().default(false),
        tabFilters : Joi.array().items(Joi.string()),
        parentId : Joi.string()
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
        _id: Joi.string(),
        tabName : Joi.string(),
        displayName: Joi.string(),
        tabUrl : Joi.string(),
        hasView: Joi.boolean().default(false),
        hasAdd: Joi.boolean().default(false),
        hasEdit: Joi.boolean().default(false),
        hasDelete: Joi.boolean().default(false),
        filters : Joi.array().items(Joi.string()),
        parentId : Joi.string()
    }).unknown()
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result._id)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}))
    })
}

export const get_all = async(req:Request, res:Response, next: any)=>{
    const schema = Joi.object({
        page: Joi.number().min(1),
        limit: Joi.number().min(1)
      });
      schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}))
    })
}

export const by_id = async (req: Request, res: Response, next: any) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json(new apiResponse(400, 'invalid id', {}, {}));
    next()
}