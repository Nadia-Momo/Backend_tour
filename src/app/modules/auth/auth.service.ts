// //login
// //logout
// //forget password
// //reset password
// //business logic handle hobe module er konoproyozon nai
// import AppError from "../../errorHelpers/AppError";
// import { IUser } from "../user/user.interface"
// import httpStatus from "http-status-codes"
// import { User } from "../user/user.model";
// import bcryptjs from "bcryptjs";
// import { generateToken } from "../../utils/jwt";
// import { envVars } from "../../config/env";
// //notun kono api hole service layer diye kaj suru korbo
// const credentialsLogin=async(payload:Partial<IUser>)=>{
// const {email,password}=payload;
// const isUserExist=await User.findOne({email})
// if(!isUserExist){
//     throw new AppError(httpStatus.BAD_REQUEST,"Email does not exist")
// }
// const isPasswordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
// if(!isPasswordMatched){
//     throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")
// }
// const jwtPayload={
//     userId:isUserExist._id,
//     email:isUserExist.email,
//     role:isUserExist.role
// }
// const accessToken=generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
// // const accessToken=jwt.sign(jwtPayload,"secret",{
// //     expiresIn:"1d"
// // })
// return {
//   accessToken,

import httpStatus from "http-status-codes"
import { User } from "../user/user.model"
import AppError from "../../errorHelpers/AppError"
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken"
import { IUser } from "../user/user.interface"
import { JwtPayload } from "jsonwebtoken"

//user -login -token(email,role,id) -booking /payment /payment cancel
// login api
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin=async(payload:Partial<IUser>)=>{
const {email,password}=payload;
const isUserExist=await User.findOne({email})
if(!isUserExist){
  throw new AppError(httpStatus.BAD_REQUEST,"User doesn't exist")
}
  const isPasswordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
  if(!isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")
  }
//   userId, email, role — এগুলো token-এর ভিতরে থাকবে যাতে পরবর্তীতে verify করে user কে চেনা যায়।
// process.env.JWT_SECRET — এটা হলো গোপন চাবি যেটা দিয়ে JWT সাইন হয়। এটা না দিলে কেউও তোমার token বানাতে পারবে।
// // expiresIn: '1h' — মানে এক ঘণ্টার জন্য token valid থাকবে।
// jwt.sign(jwtPayload,"secret",{
// expiresIn:"1d"
//   })
// delete isUserExist.password;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userToken=createUserTokens(isUserExist)
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {password: pass,...rest}=isUserExist.toObject()
// kk,okodkoekmcjkmj
return{
 accessToken:userToken.accessToken,
 refreshToken:userToken.refreshToken,
  user:rest
}
}
const getNewAccessToken=async(refreshToken:string)=>{
  const newAccessToken=await createNewAccessTokenWithRefreshToken(refreshToken)
return{
 accessToken:newAccessToken
}
}
const resetPassword=async (oldPassword:string,newPassword:string)=>{

}
export const authServices={
    credentialsLogin,
   getNewAccessToken
}
// const credentialsLogin=async(refreshToken:string)=>{
// const verifiedRefreshToken=verifyToken(refreshToken,envVars.JWT_REFRESH_EXPIRES) as JwtPayload
 
// const isUserExist=await User.findOne({email:verifiedRefreshToken})

// if(!isUserExist){
//   throw new AppError(httpStatus.BAD_REQUEST,"User doesn't exist")
// }
//   const isPasswordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
//   if(!isPasswordMatched){
//     throw new AppError(httpStatus.BAD_REQUEST,"Incorrect password")
//   }


// //   userId, email, role — এগুলো token-এর ভিতরে থাকবে যাতে পরবর্তীতে verify করে user কে চেনা যায়।

// // process.env.JWT_SECRET — এটা হলো গোপন চাবি যেটা দিয়ে JWT সাইন হয়। এটা না দিলে কেউও তোমার token বানাতে পারবে।

// // expiresIn: '1h' — মানে এক ঘণ্টার জন্য token valid থাকবে।
// jwt.sign(jwtPayload,"secret",{
// expiresIn:"1d"
//   })
// delete isUserExist.password;
// const userToken=createUserTokens(isUserExist)
// const {...rest}=isUserExist.toObject()
// return{
//  accessToken:userToken.accessToken,
//  refreshToken:userToken.refreshToken,
//   user:rest
// }
// }
// export const authServices={
//   credentialsLogin
// }