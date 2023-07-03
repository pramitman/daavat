"use strict"
import { Request, Router, Response } from 'express'
// import { userRouter } from './user'
import { userStatus } from '../common'
import { adminRouter } from './admin'
import { uploadRouter } from './upload'
// import { userRouter } from './user'



const router = Router()
const accessControl = (req: Request, res: Response, next: any) => {
    req.headers.userType = userStatus[req.originalUrl.split('/')[1]]
    next()
}
// router.use('/user',  accessControl, userRouter)

router.use('/admin', adminRouter)
router.use('/upload', uploadRouter)

export { router }