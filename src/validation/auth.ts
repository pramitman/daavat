"use strict"
import * as Joi from "joi"
import { apiResponse } from '../common'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

export const signUp = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().lowercase().required(),
        phoneNumber: Joi.string().lowercase().required(),
        password: Joi.string().required(),
      
    }).unknown(true)
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}));
    })

}

export const update = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        oldPassword: Joi.string(),
        newPassword: Joi.string().when('oldPassword', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
    }).unknown(true);
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result._id)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const login = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().lowercase().error(new Error('please provide appropriate email!')),
        uniqueId:Joi.string().lowercase().error(new Error('uniqueId is required')),
        password: Joi.string().required().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}));
    })

}
