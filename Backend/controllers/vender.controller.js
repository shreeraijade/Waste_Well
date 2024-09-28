import { Seller } from "../models/seller.model.js";
import { Vender } from "../models/vender.model.js"
import { Blog } from "../models/blogs.model.js";

const generateTokens = async function(userId){
    try {
  
      const user = await Vender.findById(userId)
  
      if(!user){
          throw new Error("user not exist")
      }
  
      const accesstoken=await user.generateAccessToken();
      const refreshtoken=await user.generateRefreshToken();

      if(!accesstoken || !refreshtoken){
         throw new Error("access token miising")
      }
  
      return {accesstoken,refreshtoken}
  
      
    } catch (error) {
       console.log(error)
    }
}

const signupVender = async function(req,res){
     try {

        const {name,email,password,contact,address} = req.body 

        if(!name || !email || !password ||!contact  || !address){
            throw new error('Some fields are missing')
        }

        const user = await Vender.findOne({
            email
        })

        if(user){
            throw new Error("user with this email already exist")
        }

        const vender = await Vender.create({
            name, email, password, contact, address
        })

        if(!vender){
            throw new error("problem while creating account")
        }

        const options = {
            httpOnly : true,
            secure : true
        }

        const {accesstoken,refreshtoken} = await generateTokens(vender._id);

        res .cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",refreshtoken,options)
        .status(200).json({vender, message: "Your Account created Successfully"})
       
        
     } catch (error) {
        res.status(500)
        console.log(error)
     }
}

const garbagePriceUpdate = async function(req,res){
    try {
        const {GarbageNo, Price, venderid} = req.body

        if(!GarbageNo || !Price){
            throw new Error("Fields are missing")
        }

        // console.log(vendor)

        

        const user=await Vender.findById(venderid);
        user.Prices[GarbageNo-1]=Price

        user.save()

        res.status(200).json({message : "Your prices are updated"})



        
        
    } catch (error) {
        console.log(error)
    }
}

const givingListForGarbage = async function(req,res){
    try {

        const {garbageNo} = req.body

        if(!garbageNo){
            throw new Error("missing garbage no")
        }

        const vendors = await Vender.find()

        const respectiveVendors= vendors.filter((vendor)=>{
             return vendor.Prices[garbageNo-1]!=-1
        })

      res.status(200).json({respectiveVendors,message:`this is the list of all vendors of ${garbageNo}`})
        
    } catch (error) {
        console.log(error)
    }
}

const loginVendor=async function(req,res){
    try {
        const {email,password}=req.body
        if(!email){
            throw new Error("email is missing")
        }
        if(!password){
            throw new Error("password is missing")
        }

        const user=await Vender.findOne({email});

        if(!user){
            throw new Error("user with this email not exist")
        }

        const isPassCorrect=await user.isPasswordCorrect(password);

        if(!isPassCorrect){
            throw new Error("password is incorrect")
        }

        const options = {
            httpOnly:true,
            secure : true
        }

        const {accesstoken,refreshtoken}=await generateTokens(user._id)

        res.cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",refreshtoken,options)
        .status(200).json({user,message: "seller logged in successfully"})
        
    } catch (error) {
        console.log(error)
    }
}

const logoutvendor=async function(req,res){
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

const getcurrentVendor=async function(req,res){
    try {
        const user=req.user;

        if(!user){
            throw new Error("error while fetching the current vendor")
        }

        res.status(200).json({user,message:"seller fetched successfully"})
        
    } catch (error) {
        console.log(error)
         res.status(500).json({message:"error while getting current vendor"})
    }
}

const sentRejectMessageToSeller=async function(req,res){
    try {
        const {email,category,RequestId}=req.body
        const vendor_user=req.user

        const seller=await Seller.findOne({email});

        if(!seller){
            throw new Error("seller not found")
        }

        const message=`Sorry..!Your request for ${category} purchase is got rehected by ${vendor_user.name} Team`

        
        let arr=vendor_user.Notifications.filter((ele)=>{
               return ele.requestId!=RequestId;
        })

        seller.Notifications.push(message)
        seller.save()

        vendor_user.Notifications=arr;
        vendor_user.save()


        res.status(200).json({accepted:false,message:message})


        
    } catch (error) {
        console.log(error)
        res.status(500).json({accepted:false,message:"error while rejecting request",error:error.message})
    }
}

const sentconfirmMessagetoSeller=async function(req,res){
    try {

        const {user_email, RequestId, category, weight, user_address,category_number}=req.body
        const vendor_user=req.user
        // console.log(user_email)

        

        const seller=await Seller.findOne({email:user_email})
        // console.log(seller)

        if(!seller){
            throw new Error("user ont found")
        }

        let arr=vendor_user.Notifications.filter((ele)=>{
            return ele.requestId!=RequestId
       })
       vendor_user.Notifications=arr;
       await vendor_user.save()

       vendor_user.Total_Garbage[category_number-1]=vendor_user.Total_Garbage[category_number-1]+weight;
       await vendor_user.save()

        const message=`Dear ${seller.name} your Request for ${category} for ${weight}kg is accepted by ${vendor_user.name}, Our member will come to your address - ${user_address} at your mentioned date`;

        seller.Notifications.push(message);
        await seller.save();
        let price=vendor_user.Prices[category_number-1];
        price=price*weight 

        seller.scores[category_number-1]=seller.scores[category_number-1]+price;
        await seller.save();

        res.status(200).json({accepted:true,message:"confirm message sent to user"})


        
    } catch (error) {
        res.status(500).json({message:"error while sending confirmation message"})
        console.log(error)
    }
}

const givingGarbageArray=async function(req,res){
    try {

        const user=req.user
        if(!user){
            throw new Error("error while fetching user")
        }

        let garbageArray = await user.Total_Garbage;

        res.status(200).json({garbageArray:garbageArray,message:"garbages collection of this vendor"})

        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const AddBlog = async function(req,res){
    try {
        const {title,description}=req.body

        if(!title || !description){
            throw new Error("missing fields")
        }

        const blog=await Blog.create({title,description})

        res.status(200).json({message:"blag added successfully",blog:blog});
        
    } catch (error) {
        res.status(500).json({error:error.message})
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




export {signupVender,garbagePriceUpdate,givingListForGarbage,loginVendor,logoutvendor,getcurrentVendor,sentRejectMessageToSeller,sentconfirmMessagetoSeller,givingGarbageArray,AddBlog,getAllBlogs}

/*

*/ 