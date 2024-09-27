import mongoose from "mongoose"


const connectDB = async function(){
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        console.log("db connected successfully")
        
    } catch (error) {
        console.log("db connection error")
    }
}

export {connectDB};
