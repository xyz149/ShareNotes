import mongoose, { Schema, SchemaTypes } from "mongoose";

const userSchema=new Schema({
    'name':{type:SchemaTypes.String, required:true, minLength:3, maxLength:10},
    'email':{type:SchemaTypes.String, required:true, unique:true},
    'password':{type:SchemaTypes.String, required:true, minLength:8},
    'status':{type:SchemaTypes.String, default:'S'},
    'regdate':{type:SchemaTypes.Date, default:Date.now}
});
export const UserModel = mongoose.model('users',userSchema);