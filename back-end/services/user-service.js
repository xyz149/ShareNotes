import { UserModel } from "../models/user-model.js"
import { compareHash, encryptPassword } from "../utils/services/password-hash.js";

export const register = async(userObject)=>{
    try{
        userObject.password = encryptPassword(userObject.password);
        const doc = await UserModel.create(userObject);
        if(doc && doc._id){
            return "User Registration Successful";
        }
    }
    catch(err){
        throw err;
    }
}
export const login = async(userObject)=>{
    try{
        const doc = await UserModel.findOne({email:userObject.email}).exec();
        if(doc && doc.email){
            if(compareHash(userObject.password,doc.password)){
                return "Welcome "+doc.name;
            }
            else{
                return "Invalid User Credentials";
            }
        }
        else{
            return "Invalid User Credentials";
        }
    }
    catch(err){
        throw new Error("Invalid User Credentials");
    }
}