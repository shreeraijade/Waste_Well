import {Router } from "express"
import {getAllBlogs, AddBlog, garbagePriceUpdate, getcurrentVendor, loginVendor, logoutvendor, sentconfirmMessagetoSeller, sentRejectMessageToSeller, signupVender } from "../controllers/vender.controller.js"
import { verifyJWT1 ,verifyJWT2} from "../middleware/auth.middleware.js"

const VendorRouter=Router()


VendorRouter.route("/register").post(signupVender)
VendorRouter.route("/update-price").post(garbagePriceUpdate)
VendorRouter.route("/login").post(loginVendor)
VendorRouter.route("/logout").post(logoutvendor)
VendorRouter.route("/getvendor").post(verifyJWT1,getcurrentVendor)
VendorRouter.route("/rejectseller").post(verifyJWT2,sentRejectMessageToSeller)
VendorRouter.route("/confirmseller").post(verifyJWT2,sentconfirmMessagetoSeller)
VendorRouter.route("/add-blog").post(verifyJWT2,AddBlog)
VendorRouter.route("/blogs").post(verifyJWT2,getAllBlogs)

export {VendorRouter}