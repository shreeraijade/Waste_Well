import { connectDB } from "./DB/db.js";
import dotenv from "dotenv"
import { app } from "./app.js";



connectDB()
.then((res)=>{
    app.listen(process.env.PORT || 8000)
   console.log(`server is listning on the port ${process.env.PORT}`)
})
.catch((error)=>{
   console.log("db connection error")
})
