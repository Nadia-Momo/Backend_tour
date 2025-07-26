
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider,  IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import {  JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
const createUserService=async(payload:Partial<IUser>)=>{
const {email,password,...rest}=payload;//epurata na patai
// const isUserExist=await User.findOne({email})
//email ta already ase kina dekhar jonno
// if(isUserExist){
//   throw new AppError(httpStatus.BAD_REQUEST,"User already exist")
// }
// const hashedPassword=await bcryptjs.hash(password as string,10)
// const isPasswordMatch=await bcryptjs.compare(password as string,hashedPassword)
// console.log(isPasswordMatch);
// console.log(hashedPassword);
//salt mane hosse kotobar loop chaliye etake encrypt korbe
//actual password er layer e layer salt bosiye etr je akta password chilo bujte dibe na
// const authProvider:IAuthProvider={provider:"credentials",providerId:email as string}
const isUserExist=await User.findOne({email})
if(isUserExist){
throw new AppError(httpStatus.BAD_REQUEST,"User already exist")
}
const hashedPassword=await bcryptjs.hash(password as string,10)
const isPasswordMatch=await bcryptjs.compare(password as string,hashedPassword)
console.log(isPasswordMatch);

const authProvider:IAuthProvider={provider:"credentials",providerId:email as string}
 const user=await User.create({
email,
password:hashedPassword,
auths:[authProvider],
...rest
 }
  //ekhane sudu payload dileo hoy kintu payload deya onk risky tai ultapalta data thakte pare
  )
 return user
}
const updateUser=async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{
const ifUserExist=await User.findById(userId);
if(!ifUserExist){
  throw new AppError(httpStatus.NOT_FOUND,"User not found")
}
// if(ifUserExist.isDeleted||ifUserExist.isActive===IsActive.BLOCKED){
//   throw new AppError(httpStatus.FORBIDDEN,"This user can not be updated")
// }
  // email can not update
  //name,phone,password address
  //password rehashing
  //only admin isadmin
  //promoting to super admin
  if(payload.role){
if(decodedToken.role===Role.USER||decodedToken.role===Role.GUIDE){
throw new AppError(httpStatus.FORBIDDEN,"You are not authorized");
}
if(payload.role===Role.SUPER_ADMIN && decodedToken.role=== Role.ADMIN){
throw new AppError(httpStatus.FORBIDDEN,"You are not authorized");
}
  }
  if(payload.isActive||payload.isDeleted||payload.isVerified){
    if(decodedToken.role==Role.USER||decodedToken.role===Role.GUIDE){
      throw new AppError(httpStatus.FORBIDDEN,"You are not authorized");
    }
  }
  if(payload.password){
    payload.password=await bcryptjs.hash(payload.password,envVars.BCRYPT_SALT_ROUND)
  }
  const newUpdatedUser=await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true})
  return newUpdatedUser;
}
const getAllUsers=async()=>{
  const users=User.find({});
  const totalUsers=await User.countDocuments()
  return {
    data:users,
    meta:{
      total:totalUsers
    }
  }
}
//user login token(email,role,_id) -booking /payment /payment cancel-token
export const UserServices={
  createUserService  ,
  getAllUsers,
  updateUser
}
//route matching->controller->service->model-DB