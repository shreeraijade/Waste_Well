import {Router } from "express"
import { garbagePriceUpdate, signupVender } from "../controllers/vender.controller.js"

const VendorRouter=Router()


VendorRouter.route("/register").post(signupVender)
VendorRouter.route("/update-price").post(garbagePriceUpdate)

export {VendorRouter}