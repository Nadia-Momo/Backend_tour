import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { authServices } from "./auth.service"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
//   const user=await UserServices.createUserService(req.body)
const loginInfo=await authServices.credentialsLogin(req.body)
  sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User logged in successfully",
    data:loginInfo
  })
})
export const authControllers={
    credentialsLogin
}