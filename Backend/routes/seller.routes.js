import {Router } from "express"
import { getCurrentSeller, loginseller, logoutSeller, RequestTovendor, signupseller } from "../controllers/seller.controller.js"
import { givingListForGarbage } from "../controllers/vender.controller.js"
import { verifyJWT1 } from "../middleware/auth.middleware.js"

const SellerRouter=Router()


SellerRouter.route("/register").post(signupseller)
SellerRouter.route("/vendor-list").post(givingListForGarbage)
SellerRouter.route("/login").post(loginseller)
SellerRouter.route("/logout").post(logoutSeller)
SellerRouter.route("/getseller").post(verifyJWT1,getCurrentSeller)
SellerRouter.route("/requesttovendor").post(verifyJWT1,RequestTovendor)

export {SellerRouter}