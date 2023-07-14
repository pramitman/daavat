"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { isValidObjectId } from 'mongoose'
import { Request, Response } from 'express'

export const add = async (req: Request, res: Response, next: any) => {
    // console.log(req.body);
    const schema = Joi.object({
        descripation: Joi.string().required(),
        image : Joi.string()
    }).unknown(true); // specify that only the defined keys are allowed
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const update = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        descripation: Joi.string(),
        image : Joi.string()
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