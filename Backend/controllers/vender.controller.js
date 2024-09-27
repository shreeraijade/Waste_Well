import { Vender } from "../models/vender.model.js"

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

        const {name,email,password,contact} = req.body 

        if(!name || !email || !password ||!contact ){
            throw new error('Some fields are missing')
        }

        const user = await Vender.findOne({
            email
        })

        if(user){
            throw new Error("user with this email already exist")
        }

        const vender = await Vender.create({
            name, email, password, contact
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
        .send({vender, message: "Your Account created Successfully"})
       
        
     } catch (error) {
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

        res.send({message : "Your prices are updated"})



        
        
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

      res.send({respectiveVendors,message:`this is the list of all vendors of ${garbageNo}`})
        
    } catch (error) {
        console.log(error)
    }
}



export {signupVender,garbagePriceUpdate,givingListForGarbage}