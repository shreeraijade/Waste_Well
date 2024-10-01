import jwt from "jsonwebtoken"
import { Seller } from "../models/seller.model.js"
import { Vender } from "../models/vender.model.js"

const verifyJWT1 = async function(req, res, next) {
    try {
        const { accesstoken } = req.cookies;
        
        if (!accesstoken) {
            return res.status(401).json({ error: "Token is missing" });
        }

        let decoded;
        let user = null;

        try {
            
            decoded = jwt.verify(accesstoken, process.env.ACCESSTOKENONE);
            user = await Seller.findById(decoded._id);
            req.type="Seller"
        } catch (error) {
            
            decoded = jwt.verify(accesstoken, process.env.ACCESSTOKENTWO);
            user = await Vender.findById(decoded._id);
            req.type="Vendor"
        }

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Invalid token or authentication failed" });
    }
};


const verifyJWT2 = async function(req,res,next){
    try {
        const {accesstoken}=req.cookies
        
        if(!accesstoken){
            throw new Error("token is missing")
        }

        const decoded=  jwt.verify(accesstoken,process.env.ACCESSTOKENTWO);

        let user=await Seller.findById(decoded._id)

        if(!user){
            user=await Vender.findById(decoded._id);
        }
        if(!user){
            throw new Error("user is missing")
        }

        req.user=user;
        next();


        
    } catch (error) {
        console.log(error)
    }
}

export {verifyJWT1,verifyJWT2}