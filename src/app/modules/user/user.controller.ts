import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
type AsyncHandler=(req:Request,res:Response,next:NextFunction)=>Promise<void>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const catchAsync=(fn:AsyncHandler)=>(req:Request,res:Response,next:NextFunction)=>{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise.resolve(fn(req,res,next)).catch((err:any)=>{
    console.log(err)
    next(err)
  })
}
// const createUserFunction=async(req:Request,res:Response)=>{
// const user= await UserServices.createUserService(req.body)
// res.status(httpStatus.CREATED).json({
//   message:"User created Succesfully",
//   user
// })
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const user=await UserServices.createUserService(req.body)
  sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User created Succesfully",
    data:user
  })
})
// const createUser=async(req:Request,res:Response,next:NextFunction)=>{
// try{
//   throw new AppError(httpStatus.BAD_REQUEST,"fake error")
// createUserFunction(req,res)
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }catch(error:any){
//   console.log(error);
// next(error);
// }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>{
// try{
// const users=await UserServices.getAllUsers();
// return users
// }
// catch(error){
// console.log(error)
// }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const result=await UserServices.getAllUsers();
sendResponse(res,req,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"All users retrieved Succesfully",
    data:result.data,
    meta:result.meta
  })
})
export const UserControllers={
  createUser,
  getAllUsers
}