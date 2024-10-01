import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_email : {
        type : String,
        required : true


    },

    date: {
        type: String,
        default: () => {
            const now = new Date();
            return now.toLocaleDateString(); 
        }
    },
    time: {
        type: String,
        default: () => {
            const now = new Date();
            return now.toLocaleTimeString(); 
        }
    }
});

export const Blog = mongoose.model("Blog",BlogSchema)