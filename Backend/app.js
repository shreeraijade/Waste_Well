import express from "express"
import cookieParser from "cookie-parser" 
import cors from "cors"
import { SellerRouter } from "./routes/seller.routes.js"
import { VendorRouter } from "./routes/vendor.route.js"

const app=express()

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/seller/",SellerRouter)
app.use("/api/v1/vendor/",VendorRouter)




export {app};