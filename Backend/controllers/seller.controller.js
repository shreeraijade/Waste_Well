import { Seller } from "../models/seller.model.js"


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
        .send({seller, message: "Your Account created Successfully"})
        
        
     } catch (error) {
        console.log(error)
     }
}



export {signupseller}