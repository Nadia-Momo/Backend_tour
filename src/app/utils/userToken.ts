import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";
export const createUserTokens=(user:Partial<IUser>)=>{
      const jwtPayload={
    userId:user._id,
    email:user.email,
    role:user.role
  }
  const accessToken=generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
  const refreshToken=generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRES)
  return{
    accessToken,
    refreshToken
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewAccessTokenWithRefreshToken:any=async(refreshToken:string)=>{
const verifiedRefreshToken=verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload
const isUserExist=await User.findOne({email:verifiedRefreshToken.email})
if(!isUserExist){
  throw new AppError(httpStatus.BAD_REQUEST,"User doesn't exist")
}
if(isUserExist.isActive===IsActive.BLOCKED || isUserExist.isActive===IsActive.INACTIVE){
throw new AppError(httpStatus.BAD_REQUEST,`"User is ${isUserExist.isActive}"`)
}
if(isUserExist.isDeleted){
throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
}

//   userId, email, role — এগুলো token-এর ভিতরে থাকবে যাতে পরবর্তীতে verify করে user কে চেনা যায়।
// process.env.JWT_SECRET — এটা হলো গোপন চাবি যেটা দিয়ে JWT সাইন হয়। এটা না দিলে কেউও তোমার token বানাতে পারবে।
// // expiresIn: '1h' — মানে এক ঘণ্টার জন্য token valid থাকবে।
// jwt.sign(jwtPayload,"secret",{
// expiresIn:"1d"
//   })
// delete isUserExist.password;
const jwtPayload={
  userId:isUserExist._id,
  email:isUserExist.email,
  role:isUserExist.role
}
const accessToken=generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
const newAccessToken=createNewAccessTokenWithRefreshToken(refreshToken)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
return {
  accessToken,
  newAccessToken
}
}