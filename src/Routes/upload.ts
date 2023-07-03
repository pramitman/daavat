"use strict"
import { Router } from 'express'
import { uploadJWT, userJWT } from '../helper/jwt'
import { compress_image, image_compress_response, delete_file, uploadS3 } from '../helper/s3'
import { apiResponse, file_path } from '../common'
import { Request, Response } from 'express'
import { responseMessage } from '../helper'

const router = Router()
const file_type = async (req: Request, res: Response, next: any) => {
    if (!file_path.includes(req.params.file)) return res.status(400).json(new apiResponse(400, 'invalid file type', { action: file_path }, {}))
    next()
}

//---------------------- Authentication ---------------------------------------  
router.post("" , (req : any,res : any) =>
{
    // console.log(req.body , "body");
    let file = req.file
    // console.log(file , "file log");
    let imageUrl = process.env.BACKEND_URL + `/images/${file.filename}`;
    console.log(imageUrl , "imageUrl");
    return res.status(200).json(new apiResponse(200, responseMessage.addDataSuccess("Image"), {data : imageUrl}, {}));
})

export const uploadRouter = router