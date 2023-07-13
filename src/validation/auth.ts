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
        role: Joi.string().required(),
        roleId : Joi.string(),
        isSuperAdmin : Joi.boolean().required().default(false)
      
    }).unknown(true)
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}));
    })

}

export const verifyOtp = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        shopId: Joi.string().required(),
        otp: Joi.string(),
    }).unknown(true);
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result.shopId)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}

export const login = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().lowercase(),
        uniqueId:Joi.string().lowercase(),
        password: Joi.string().required(),
    })
    schema.validateAsync(req.body).then(result => {
        return next()
    }).catch(error => {
        res.status(400).json(new apiResponse(400, error.message, {}, {}));
    })

}

export const resendOtp = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        shopId: Joi.string().required(),
    }).unknown(true);
    schema.validateAsync(req.body).then(result => {
        req.body = result
        if (!isValidObjectId(result.shopId)) return res.status(400).json(new apiResponse(400, "Invalid _id format", {}, {}));
        return next()
    }).catch(error => { res.status(400).json(new apiResponse(400, error.message, {}, {})) })
}