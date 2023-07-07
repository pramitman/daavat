"use strict"
import * as Joi from "joi"
import { apiResponse, roleTypes } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const add = async (req: Request, res: Response, next: any) => {
    // console.log(req.body);
    const schema = Joi.object({
        name: Joi.string(),
        ownerName: Joi.string(),
        contact: Joi.object({
          countryCode: Joi.string(),
          mobile: Joi.string()
        }),
        areaCode: Joi.string(),
        shopPhoto: Joi.string(),
        address: Joi.object({
          addressLine: Joi.string(),
          latitude: Joi.string(),
          longitude: Joi.string()
        }),
        role: Joi.string().valid(...roleTypes),
        roleId: Joi.string(),
        isMobileValid: Joi.boolean().default(false),

    }).unknown(true); // specify that only the defined keys are allowed
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const update = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        ownerName: Joi.string().required(),
        contact: Joi.object({
          countryCode: Joi.string().required(),
          mobile: Joi.string().required()
        }),
        areaCode: Joi.string().required(),
        shopPhoto: Joi.string(),
        address: Joi.object({
          addressLine: Joi.string().required(),
          latitude: Joi.string().required(),
          longitude: Joi.string().required()
        }),
        role: Joi.string().valid(...roleTypes).required(),
        roleId: Joi.string().required(),
        isMobileValid: Joi.boolean().default(false),
    }).unknown(true);
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result._id)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const get_all = async(req:Request, res:Response, next: any)=>{
    const schema = Joi.object({
        page: Joi.number().min(1),
        limit: Joi.number().min(1),
        areaFilter : Joi.array().optional()
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