"use strict"

import { Router } from 'express'
import { adminController, authController } from '../controllers'
import { adminJWT } from '../helper'
import { authValidation, catlogueValidation, productValidation, variantValidation } from '../validation'

const router = Router()


router.post("/signup", authValidation.signUp, authController.signUp)
router.post("/login", authValidation.login, authController.login)

router.use(adminJWT)
//-------------------- variant --------------------
router.post("/variant/add", variantValidation.add ,adminController.add_variant)
router.post("/variant/edit", variantValidation.update,adminController.edit_variant_by_id)
router.delete("/variant/:id", variantValidation.by_id, adminController.delete_variant_by_id)
router.post("/variant/get/all",variantValidation.get_all, adminController.get_all_variant)
router.get("/variant/:id", variantValidation.by_id, adminController.get_by_id_variant)

//-------------------- product --------------------
router.post("/product/add", productValidation.add, adminController.add_product)
router.post("/product/edit", productValidation.update,adminController.edit_product_by_id)
router.delete("/product/:id", productValidation.by_id, adminController.delete_product_by_id)
router.post("/product/get/all", productValidation.get_all, adminController.get_all_product)
router.get("/product/:id", productValidation.by_id, adminController.get_by_id_product)

//-------------------- catlogue --------------------
router.post("/catlogue/add", catlogueValidation.add, adminController.add_catlogue)
router.post("/catlogue/edit", catlogueValidation.update, adminController.edit_catlogue_by_id)
router.delete("/catlogue/:id", catlogueValidation.by_id, adminController.delete_catlogue_by_id)
router.post("/catlogue/get/all", catlogueValidation.get_all, adminController.get_all_catlogue)
router.get("/catlogue/:id", catlogueValidation.by_id, adminController.get_by_id_catlogue)


export const adminRouter = router