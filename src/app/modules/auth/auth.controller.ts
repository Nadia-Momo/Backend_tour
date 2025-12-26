import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"

import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookie } from "./setCookie"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const loginInfo=await authServices.credentialsLogin(req.body)
// res.cookie('accessToken',loginInfo.accessToken,{
//   httpOnly:true,
//   secure:false
// })
setAuthCookie(res,loginInfo)
res.cookie("refreshToken",loginInfo.refreshToken,{
  httpOnly:true,
  secure:false,

})
  sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User logged in successfully",
    data:loginInfo
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const refreshToken=req.cookies.refreshToken;
if(!refreshToken){
  throw new AppError(httpStatus.BAD_REQUEST,"No refresh token received from cookies")
}
const TokenInfo=await authServices.getNewAccessToken(refreshToken)
setAuthCookie(res,TokenInfo)
  sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.OK,
    message:"New Access token retrived successfully",
    data:TokenInfo
  })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

res.clearCookie("accessToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})
res.clearCookie("refreshToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})
  sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User logged out successfully",
    data:null
  })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const newPassword=req.body.password;
  const newPassword=await authServices.reset
res.clearCookie("accessToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})
res.clearCookie("refreshToken",{
  httpOnly:true,
  secure:false,
  sameSite:"lax"
})
})
export const authControllers={
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword
}