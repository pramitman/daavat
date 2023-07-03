"use strict"

import { Router } from 'express'
import { adminController, authController } from '../controllers'
import { adminJWT } from '../helper'

const router = Router()


router.post("/signup", authController.signUp)
router.post("/login", authController.login)

router.use(adminJWT)
//-------------------- variant --------------------
router.post("/variant/add", adminController.add_variant)
router.post("/variant/edit", adminController.edit_variant_by_id)
router.delete("/variant/:id", adminController.delete_variant_by_id)
router.post("/variant/get/all", adminController.get_all_variant)
router.get("/variant/:id", adminController.get_by_id_variant)

//-------------------- product --------------------
router.post("/product/add", adminController.add_product)
router.post("/product/edit", adminController.edit_product_by_id)
router.delete("/product/:id", adminController.delete_product_by_id)
router.post("/product/get/all", adminController.get_all_product)
router.get("/product/:id", adminController.get_by_id_product)

//-------------------- catlogue --------------------
router.post("/catlogue/add", adminController.add_catlogue)
router.post("/catlogue/edit", adminController.edit_catlogue_by_id)
router.delete("/catlogue/:id", adminController.delete_catlogue_by_id)
router.post("/catlogue/get/all", adminController.get_all_catlogue)
router.get("/catlogue/:id", adminController.get_by_id_catlogue)


export const adminRouter = router