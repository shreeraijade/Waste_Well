
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SellerSchema = mongoose.Schema({
      name : {
            type : String,
            required : true
      },
      email : {
            type : String,
            required : true,
            unique : true
      },
      password : {
            type : String,
            required : true
      },

      contact : {
        type :String,
        required : true

      },

      address : {
        type : String,
        required : true
      },

      scores : {
        type : [Number],
        default : [0,0,0,0,0]
      },

      Notifications : {
        type : [Object]
      }

});

SellerSchema.methods.isPasswordCorrect=function(password){
   return  bcrypt.compare(password,this.password)
}

SellerSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

SellerSchema.methods.generateAccesstoken=function(){
    return jwt.sign(
       {
         _id : this._id,
         name : this.name,
         email : this.email
       },
       
       process.env.ACCESSTOKENONE,
       {
        expiresIn : process.env.ACCESSTOKENONEEXPIRY
       }
    )
}

SellerSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
     {
       _id : this._id,
       name : this.name,
       email : this.email
     },
     
     process.env.REFRESHTOKENONE,
     {
      expiresIn : process.env.REFRESHTOKENONEEXPIRY
     }
  )
}

export const Seller = mongoose.model("Seller",SellerSchema)
