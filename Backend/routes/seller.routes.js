import {Router } from "express"
import { signupseller } from "../controllers/seller.controller.js"
import { givingListForGarbage } from "../controllers/vender.controller.js"

const SellerRouter=Router()


SellerRouter.route("/register").post(signupseller)
SellerRouter.route("/vendor-list").post(givingListForGarbage)

export {SellerRouter}