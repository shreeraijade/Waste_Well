import {Router } from "express"
import { garbagePriceUpdate, getcurrentVendor, loginVendor, logoutvendor, sentconfirmMessagetoSeller, sentRejectMessageToSeller, signupVender } from "../controllers/vender.controller.js"
import { verifyJWT2 } from "../middleware/auth.middleware.js"

const VendorRouter=Router()


VendorRouter.route("/register").post(signupVender)
VendorRouter.route("/update-price").post(garbagePriceUpdate)
VendorRouter.route("/login").post(loginVendor)
VendorRouter.route("/logout").post(logoutvendor)
VendorRouter.route("/getvendor").post(verifyJWT1,getcurrentVendor)
VendorRouter.route("/rejectseller").post(verifyJWT2,sentRejectMessageToSeller)
VendorRouter.route("/confirmseller").post(verifyJWT2,sentconfirmMessagetoSeller)

export {VendorRouter}

/*

  
  4. blogs adding 
  5. giving all blogs 
  6. update leader board show leader board
*/ 