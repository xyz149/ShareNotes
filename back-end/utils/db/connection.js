import mongoose from "mongoose";

export const createConneciton=()=>{
    return mongoose.connect(process.env.DB_URL,{
        maxPoolSize:5
    });
}