"use strict"
import { Router } from 'express'
import { adminController, authController } from '../controllers'
import { adminJWT } from '../helper'
import { agencyValidation, authValidation, catlogueValidation, filterValidation, galleryValidation, orderValidation, productValidation, roleValidation, shopValidation, tabmasterValidation, userValidation, variantValidation } from '../validation'
import { ADMIN_ROLES } from '../common'
import { VALIDATE_ROLE } from '../helper/middleware'

const router = Router()


router.post("/signup", authValidation.signUp, authController.signUp)
router.post("/login", authValidation.login, authController.login)


router.use(adminJWT)
//-------------------- Variant --------------------
router.post("/variant/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), variantValidation.add ,adminController.add_variant)
router.post("/variant/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), variantValidation.update,adminController.edit_variant_by_id)
router.delete("/variant/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), variantValidation.by_id, adminController.delete_variant_by_id)
router.post("/variant/get/all",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), variantValidation.get_all, adminController.get_all_variant)
router.get("/variant/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), variantValidation.by_id, adminController.get_by_id_variant)

//-------------------- Product --------------------
router.post("/product/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), productValidation.add, adminController.add_product)
router.post("/product/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), productValidation.update,adminController.edit_product_by_id)
router.delete("/product/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), productValidation.by_id, adminController.delete_product_by_id)
router.post("/product/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), productValidation.get_all, adminController.get_all_product)
router.get("/product/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), productValidation.by_id, adminController.get_by_id_product)

//-------------------- Catlogue --------------------
router.post("/catlogue/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), catlogueValidation.add, adminController.add_catlogue)
router.post("/catlogue/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), catlogueValidation.update, adminController.edit_catlogue_by_id)
router.delete("/catlogue/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), catlogueValidation.by_id, adminController.delete_catlogue_by_id)
router.post("/catlogue/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), catlogueValidation.get_all, adminController.get_all_catlogue)
router.get("/catlogue/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), catlogueValidation.by_id, adminController.get_by_id_catlogue)

//-------------------- Agency --------------------
router.post("/agency/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), agencyValidation.add, adminController.add_agency)
router.post("/agency/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), agencyValidation.update, adminController.edit_agency_by_id)
router.delete("/agency/:id",  VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), agencyValidation.by_id, adminController.delete_agency_by_id)
router.post("/agency/get/all",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), agencyValidation.get_all,  adminController.get_all_agency)
router.get("/agency/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), agencyValidation.by_id,  adminController.get_by_id_agency)

//-------------------- Gallery --------------------
router.post("/gallery/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), galleryValidation.add, adminController.add_gallery)
router.post("/gallery/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), galleryValidation.update, adminController.edit_gallery_by_id)
router.delete("/gallery/:id",  VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), galleryValidation.by_id, adminController.delete_gallery_by_id)
router.post("/gallery/get/all",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), galleryValidation.get_all, adminController.get_all_gallery)
router.get("/gallery/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN]), galleryValidation.by_id,  adminController.get_by_id_gallery)

//-------------------- User --------------------
router.post("/user/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.AGENCY]), userValidation.add, adminController.add_user)
router.post("/user/edit",  VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.AGENCY]), userValidation.update, adminController.edit_user_by_id)
router.delete("/user/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.AGENCY]), userValidation.by_id, adminController.delete_user_by_id)
router.post("/user/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.AGENCY]), userValidation.get_all, adminController.get_all_user)
router.get("/user/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.ADMIN, ADMIN_ROLES.AGENCY]), userValidation.by_id, adminController.get_by_id_user)

//----------------------------- Role ----------------------------------------------
router.post("/role/add",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), roleValidation.add, adminController.add_role)
router.post("/role/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), roleValidation.update,adminController.edit_role_by_id)
router.delete("/role/delete/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), roleValidation.by_id, adminController.delete_role_by_id)
router.post("/role/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), roleValidation.get_all, adminController.get_all_role)

//----------------------------- Tab Master ----------------------------------------------
router.post("/tabmaster/add",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), tabmasterValidation.add, adminController.add_tab_master)
router.post("/tabmaster/edit", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), tabmasterValidation.update, adminController.edit_tab_master_by_id)
router.delete("/tabmaster/delete/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), tabmasterValidation.by_id,adminController.delete_tab_master_by_id)
router.post("/tabmaster/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), tabmasterValidation.get_all,adminController.get_all_tab_master)
router.get("/tabmaster/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), tabmasterValidation.by_id, adminController.get_tab_master_by_id)

//----------------------------- Role Details ----------------------------------------------
router.get("/role/details/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]),  roleValidation.by_id, adminController.get_role_details_by_roleId)

//----------------------------- Filter ----------------------------------------------
router.post("/filter/add",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), filterValidation.add ,adminController.add_filter)
router.post("/filter/edit",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), filterValidation.update, adminController.edit_filter_by_id)
router.get("/filter/:id",VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), filterValidation.by_id, adminController.get_filter_by_tabId)

//-------------------- Shop --------------------
router.post("/shop/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.SALESMAN]), shopValidation.add, adminController.add_shop)
router.post("/shop/edit",  VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.SALESMAN]), shopValidation.update, adminController.edit_shop_by_id)
router.delete("/shop/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), shopValidation.by_id, adminController.delete_shop_by_id)
router.post("/shop/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN,ADMIN_ROLES.AGENCY, ADMIN_ROLES.SALESMAN]), shopValidation.get_all,  adminController.get_all_shop)
router.get("/shop/:id", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN,  ADMIN_ROLES.SALESMAN]), shopValidation.by_id, adminController.get_by_id_shop)
router.post("/shop/otp/verify", authValidation.verifyOtp, adminController.verifyOtp)
router.post("/shop/resend", authValidation.verifyOtp, adminController.resendOtp)

//-------------------- Order --------------------
router.post("/order/add", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN]), orderValidation.add, adminController.add_order)
router.post("/order/edit",  VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.DELIVERYMAN]), orderValidation.update, adminController.edit_order_by_id)
router.post("/order/get/all", VALIDATE_ROLE([ADMIN_ROLES.SUPERADMIN, ADMIN_ROLES.DELIVERYMAN, ADMIN_ROLES.SALESMAN]), orderValidation.get_all,  adminController.get_all_order)

export const adminRouter = router