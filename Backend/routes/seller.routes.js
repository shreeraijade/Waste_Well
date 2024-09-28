import {Router } from "express"
import { AddBlog, getCurrentSeller, getLeaderBoaredArray, givingScores, loginseller, logoutSeller, RequestTovendor, signupseller } from "../controllers/seller.controller.js"
import { getAllBlogs, givingListForGarbage } from "../controllers/vender.controller.js"
import { verifyJWT1 } from "../middleware/auth.middleware.js"

const SellerRouter=Router()


SellerRouter.route("/register").post(signupseller)
SellerRouter.route("/vendor-list").post(givingListForGarbage)
SellerRouter.route("/login").post(loginseller)
SellerRouter.route("/logout").post(logoutSeller)
SellerRouter.route("/getseller").post(verifyJWT1,getCurrentSeller)
SellerRouter.route("/requesttovendor").post(verifyJWT1,RequestTovendor)
SellerRouter.route("/scores").post(verifyJWT1,givingScores)
SellerRouter.route("/add-blog").post(verifyJWT1,AddBlog)
SellerRouter.route("/blogs").post(verifyJWT1,getAllBlogs)
SellerRouter.route("/get-leaderboard").post(verifyJWT1,getLeaderBoaredArray)

export {SellerRouter}