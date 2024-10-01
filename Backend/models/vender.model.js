import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { JsonWebTokenError } from "jsonwebtoken";

const VenderSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,

    },

    contact : {
        type : String,
        required : true
    },

    email :{
        type : String,
        required : true,
        unique : true
    },
    address :{
        type: String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    Total_Garbage :{
        type : [Number],
        default : [0,0,0,0,0]
    },
    Prices :{
        type : [Number],
        default : [-1,-1,-1,-1,-1]
    },

    Notifications : {
        type : [Object]
    }




})

VenderSchema.methods.isPasswordCorrect=function(password){
    return  bcrypt.compare(password,this.password)
 }

VenderSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
});

VenderSchema.methods.generateAccessToken=function(){
    return jwt.sign(
       {
         _id : this._id,
         name : this.name,
         email : this.email
       },
       
       process.env.ACCESSTOKENTWO,
       {
        expiresIn : process.env.ACCESSTOKENTWOEXPIRY
       }
    )
}

VenderSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
       {
         _id : this._id,
         name : this.name,
         email : this.email
       },
       
       process.env.REFRESHTOKENTWO,
       {
        expiresIn : process.env.REFRESHTOKENTWOEXPIRY
       }
    )
  }

export const Vender = mongoose.model("Vender",VenderSchema);