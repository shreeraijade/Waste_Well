import { Seller } from "../models/seller.model.js"
import { Vender } from "../models/vender.model.js";
import { Blog } from "../models/blogs.model.js";


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
            throw new Error('Some fields are miising')
        }

        const user = await Seller.findOne({
            email
        })

        if(user){
            throw new Error("user with this email already exist")
        }

        const seller = await Seller.create({
            name, email, password, contact, address
        })

        if(!seller){
            throw new Error("problem while creating account")
        }

        const options = {
            httpOnly: true,
            secure : true
        }

        const {accesstoken,refreshtoken} = await generateTokens(seller._id);

        res
        .cookie("accesstoken",accesstoken)
        .cookie("refreshtoken",refreshtoken)
        .status(200).json({user:seller, type: "Seller"})
        
        
     } catch (error) {
        console.log(error)
     }
}


const getLeaderBoaredArray = async function(req,res){
    try {

        const sellers = await Seller.find()
        let arr=[...sellers];
        let arr2;

       arr2= arr.map((ele,index)=>{
            let sum=0;
            ele.scores.map((score)=>{
                sum=sum+score
            })
            return {
                
                sum:sum,
                email:ele.email,
                name:ele.name
            }

        })

        arr2.sort((a, b) => b.sum - a.sum);

        res.status(200).json({message:"leaderBoard fetched successfully",leaderArray:arr2})

        
    } catch (error) {
        res.status(500).json({message:"error while fetching leaderBoard"})
    }
}

const loginseller=async function(req,res){
    try {
        const { email, password }=req.body
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

        res.cookie("accesstoken",accesstoken)
        .cookie("refreshtoken",refreshtoken)
        .status(200).json({user:seller,message: "seller logged in successfully", type: "Seller"})
        
    } catch (error) {
        console.log(error)
    }
}

const AddBlog = async function(req,res){
    try {
        const {title,description}=req.body
        const user=req.user

        if(!title || !description){
            throw new Error("missing fields")
        }

        const blog=await Blog.create({title,description,user_email:user.email})

        res.status(200).json({message:"blag added successfully",blog:blog});
        
    } catch (error) {
        res.status(500).json({error:error.message})
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

        const {date,weight,category,vendor_email}=req.body 
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
            "date": date,
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

const getAllBlogs = async function(req,res){
    try {

        const blogs=await Blog.find()
        let arr=[...blogs]
        let arrblogs=arr.reverse()



        
        res.status(200).json({message:"all blogs are fetched successfully",arrblogs:arrblogs})
        
    } catch (error) {
        
    }
}

const getrank = async function(req,res){
    try {
        const user=req.user 
        const sellers = await Seller.find()
        let arr=[...sellers];
        let arr2;

       arr2= arr.map((ele,index)=>{
            let sum=0;
            ele.scores.map((score)=>{
                sum=sum+score
            })
            return {
                
                sum:sum,
                email:ele.email,
                name:ele.name
            }

        })

        arr2.sort((a, b) => b.sum - a.sum);

        let rank=0;
        arr2.map((ele,ind)=>{
            if(ele.email==user.email){
                rank=ind+1;
            }
        })

        res.status(200).json({message:"rank fetched successfully",rank:rank})
        
    } catch (error) {
        res.status(500).json({message:"error while fetching rank",error:error.message})
        console.log(error)
    }
}

const editUser = async function(req,res) {
    try {
        const user=req.user
        const type=req.type
        const {name,contact}=req.body 

        user.name=name?name:user.name
        user.contact=contact?contact:user.contact
        user.save()

        res.status(200).json({message:"user edited successfully", user:user,type:type})


        
    } catch (error) {
        console.log(error)
    }
}




export {editUser, getrank, getLeaderBoaredArray, getAllBlogs, AddBlog, signupseller,loginseller,logoutSeller,getCurrentSeller,RequestTovendor}