import * as Joi from "joi"
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { apiResponse } from "../common";

export const add = async(req:Request, res:Response, next:any)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        roleDetails : Joi.array().items(
            Joi.object({
                tabId: Joi.string().required(),
                view: Joi.boolean().default(true),
                add: Joi.boolean().default(false),
                edit: Joi.boolean().default(false),
                delete: Joi.boolean().default(false),
                filters: Joi.array().items(
                    Joi.object({
                      id: Joi.string(),
                      hasAccess: Joi.boolean().default(true),
                    })
                )

            })
        ),
    }).unknown(true)
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
        name : Joi.string(),
        rolePermissions : Joi.array().items(
            Joi.object({
                tabId: Joi.string(),
                view: Joi.boolean().default(true),
                add: Joi.boolean().default(false),
                edit: Joi.boolean().default(false),
                delete: Joi.boolean().default(false),
                filters: Joi.array().items(
                    Joi.object({
                      id: Joi.string(),
                      hasAccess: Joi.boolean().default(true),
                    })
                )
            })
        ),    
    }).unknown(true)
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
        limit: Joi.number().min(1),
        isAdminRole: Joi.boolean().optional()
      }).unknown(true)
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