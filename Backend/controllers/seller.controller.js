import { Seller } from "../models/seller.model.js"
import { Vender } from "../models/vender.model.js";


const generateTokens = async function(userId){
  try {

    const user = await Seller.findById(userId)

    if(!user){
        throw new Error("user not exist")
    }

    const accesstoken=await user.generateAccesstoken();
    const refreshtoken=await user.generateRefreshToken();

    return {accesstoken,refreshtoken}

    
  } catch (error) {
     console.log(error)
  }
}

const signupseller = async function(req,res){
     try {

        const {name,email,password,address,contact} = req.body 

        if(!name || !email || !password || !address || !contact){
            throw new error('Some fields are miising')
        }

        const user = await Seller.findOne({
            email
        })

        if(user){
            throw new error("user with this email already exist")
        }

        const seller = await Seller.create({
            name, email, password, contact, address
        })

        if(!seller){
            throw new error("problem while creating account")
        }

        const options = {
            httpOnly: true,
            secure : true
        }

        const {accesstoken,refreshtoken} = await generateTokens(seller._id);

        res
        .cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",refreshtoken,options)
        .status(200).json({seller})
        
        
     } catch (error) {
        console.log(error)
     }
}

const loginseller=async function(req,res){
    try {
        const {email,password}=req.body
        if(!email){
            throw new Error("email is missing")
        }
        if(!password){
            throw new Error("password is missing")
        }

        const seller=await Seller.findOne({email});

        if(!seller){
            throw new Error("user with this email not exist")
        }

        const isPassCorrect=await seller.isPasswordCorrect(password);

        if(!isPassCorrect){
            throw new Error("password is incorrect")
        }

        const options = {
            httpOnly:true,
            secure : true
        }

        const {accesstoken,refreshtoken}=await generateTokens(seller._id)

        res.cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",refreshtoken,options)
        .status(200).json({seller,message: "seller logged in successfully"})
        
    } catch (error) {
        console.log(error)
    }
}

const logoutSeller=async function(req,res){
    try {
        // const user=req.body
        // if(!user){
        //     throw new Error("user is missing")
        // }

        res.clearCookie("accesstoken")
        .clearCookie("refreshtoken")
        .status(200).json({message:"vendor logged out suucessfully"})
        
    } catch (error) {
        res.status(500).json({message:"error ehile logging out",error:error.message})
        console.log(error)
    }
}

const getCurrentSeller=async function(req,res){
    try {
        const user=req.user;

        if(!user){
            throw new Error("error while fetching the current seller")
        }

        res.status(200).json({user,message:"seller fetched successfully"})
        
    } catch (error) {
        console.log(error)
         res.status(500).json({message:"error while getting current seller"})
    }
}

const RequestTovendor=async function(req,res){
    try {

        const {day,month,year,weight,category,vendor_email}=req.body 
        const user=req.user

        if(!user){
            throw new Error("error while getting the user")
        }

        const vendorUser=await Vender.findOne({email:vendor_email});

        if(!vendorUser){
            throw new Error("vendor with this mail not exist")
        }



        const ans = {
            "requestId":Date.now(),
            "name" : user.name,
            "user_email" : user.email,
            "user_contact" : user.contact,
            "user_address":user.address,
            "user_id":user._id,
            "category" : category,
            "weight" : weight,
            "day" : day,
            "month" : month,
            "year" : year,
            "confirmed" : false,
            "rejected" : false

        }

        vendorUser.Notifications.push(ans);
        vendorUser.save();

        res.status(200).json({message:"request send successfully",ans})


        
    } catch (error) {
        res.status(500).json({message:"error while sending notification",error:error.message})
    }
}




export {signupseller,loginseller,logoutSeller,getCurrentSeller,RequestTovendor}