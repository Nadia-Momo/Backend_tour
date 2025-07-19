import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
const createUserService=async(payload:Partial<IUser>)=>{
const {email,password,...rest}=payload;//epurata na patai
const isUserExist=await User.findOne({email})
//email ta already ase kina dekhar jonno
if(isUserExist){
  throw new AppError(httpStatus.BAD_REQUEST,"User already exist")
}
const hashedPassword=await bcryptjs.hash(password as string,10)
const isPasswordMatch=await bcryptjs.compare(password as string,hashedPassword)
console.log(isPasswordMatch);
console.log(hashedPassword);
//salt mane hosse kotobar loop chaliye etake encrypt korbe
//actual password er layer e layer salt bosiye etr je akta password chilo bujte dibe na
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
export const UserServices={
  createUserService  ,
  getAllUsers
}
//route matching->controller->service->model->DB