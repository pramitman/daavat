"use strict"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { userModel, userSessionModel } from '../../database'
import { apiResponse, generate_otp } from '../../common'
import { email_verification_mail, forgot_password_mail, reqInfo, responseMessage } from '../../helper'
import { adminModel } from '../../database/models/admin'
import { roleDetailsModel } from '../../database/models/role_details'
import { roleModel } from '../../database/models/role'
import { agencyModel } from '../../database/models/agency'
import { shopModel } from '../../database/models/shop'

const ObjectId = require('mongoose').Types.ObjectId
const jwt_token_secret = process.env.JWT_TOKEN_SECRET


export const signUp = async (req: Request, res: Response) => {
    reqInfo(req)
    try {
        let body = req.body,
            otp,
            otpFlag = 1, // OTP has already assign or not for cross-verification
            authToken = 0
            let  isAlready : any = await adminModel.findOne({ email: body?.email, isDeleted: false })
        if (isAlready) return res.status(409).json(new apiResponse(409, responseMessage?.alreadyEmail, {}, {}))
         isAlready = await adminModel.findOne({ phoneNumber: body?.phoneNumber, isDeleted: false })
        if (isAlready) return res.status(409).json(new apiResponse(409, "phone number exist already", {}, {}))
        

        if (isAlready?.isBlock == true) return res.status(403).json(new apiResponse(403, responseMessage?.accountBlock, {}, {}))

        const salt = await bcryptjs.genSaltSync(10)
        const hashPassword = await bcryptjs.hash(body.password, salt)
        delete body.password
        body.password = hashPassword
        let response = await new adminModel(body).save()
        response = {
            role : response?.role,
            _id : response?._id,
            email : response?.email,
        }

        // while (otpFlag == 1) {
        //     for (let flag = 0; flag < 1;) {
        //         otp = await Math.round(Math.random() * 1000000);
        //         if (otp.toString().length == 6) {
        //             flag++;
        //         }
        //     }
        //     let isAlreadyAssign = await adminModel.findOne({ otp: otp });
        //     if (isAlreadyAssign?.otp != otp) otpFlag = 0;
        // }

        // let result: any = await email_verification_mail(response, otp);
        // if (result) {
        //     await userModel.findOneAndUpdate(body, { otp, otpExpireTime: new Date(new Date().setMinutes(new Date().getMinutes() + 10)) })
        //     return res.status(200).json(new apiResponse(200, `${result}`, {}, {}));
        // }
        // else return res.status(501).json(new apiResponse(501, responseMessage?.errorMail, {}, `${result}`));
        return res.status(200).json(new apiResponse(200, responseMessage?.addDataSuccess("admin"),response , {}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const login = async (req: Request, res: Response) => { //email and password
    let body = req.body, roleDetails:any ,rootTabs:any
       
    reqInfo(req)
    try {
        console.log(body);
        const response = await adminModel.findOneAndUpdate({ email: body?.email, isDeleted: false }, {  isLoggedIn : true }).select('-__v -createdAt -updatedAt').lean()
        const agency = await agencyModel.findOneAndUpdate({ uniqueId: body?.uniqueId, isDeleted: false }, { isLoggedIn: true }).select('-__v -createdAt -updatedAt').lean()
        const user = await userModel.findOneAndUpdate({ uniqueId: body?.uniqueId, isDeleted: false, }, { isLoggedIn: true }).select('-__v -createdAt -updatedAt').lean()
        const shop = await shopModel.findOneAndUpdate({ uniqueId: body?.uniqueId, isDeleted: false, }, { isLoggedIn: true }).select('-__v -createdAt -updatedAt').lean()

       if (!response && !agency && !user && !shop) return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
       
       let userResponse
       if (response) {
           userResponse = response
           const passwordMatch = await bcryptjs.compare(body.password, userResponse.password)
           if (!passwordMatch) return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
        } else if (agency) {
            userResponse = agency
            //compare agency password
            if (userResponse.password !== body.password) {
                return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
            }
        } else if (user) {
            userResponse = user
            //compare user password
            if (userResponse.password !== body.password) {
                return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
            }
        }else if (shop) {
            userResponse = shop
            //compare user password
            if (userResponse.password !== body.password) {
                return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
            }
        }
        console.log("userResponse => ",userResponse);
        const token = jwt.sign({
            _id: userResponse._id,
            type: userResponse.userType,
            status: "Login",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret)

        await new userSessionModel({
            createdBy: userResponse._id,
        }).save()

        if(userResponse.isSuperAdmin == true){
            return res.status(200).json(new apiResponse(200, responseMessage?.loginSuccess, {...userResponse, token}, {}))
        }
        else{
            if(userResponse.roleId){
                const roleId = await roleModel.findOne({_id: userResponse.roleId})
            console.log("roleId = ",roleId);
            let match:any = {}
            match.roleId = ObjectId(roleId._id)

            roleDetails = await roleDetailsModel.find({roleId:ObjectId(roleId._id)}).populate({
                path:"filters.id",
                select:'filter -_id'
            }).populate('tabId')
            .lean()
            console.log("roleDetails => ",roleDetails);
            const tabMap = new Map();
            roleDetails.forEach(roleDetail => {
            const tab = roleDetail.tabId;
            const tabId = tab._id.toString();
  
            if (!tabMap.has(tabId)) {
                tab.childTabs = [];
                tabMap.set(tabId, tab);
            }
            });
           
           
            // Build the hierarchy by adding child tabs to their respective parent tabs
             rootTabs = [];
            roleDetails.forEach(roleDetail => {
    
            const tab = roleDetail.tabId;
           
            const parentId = tab.parentId ? tab.parentId.toString() : null;
         
            const parentTab = tabMap.get(parentId);
         
            if (parentTab) {
                parentTab.childTabs.push(roleDetail);
            } else {
                //if parentId null then and then push
                rootTabs.push(roleDetail);
            }
            });
            }
        }
        
            return res.status(200).json(new apiResponse(200, responseMessage?.loginSuccess, {...userResponse, token,  roleDetails : rootTabs}, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}