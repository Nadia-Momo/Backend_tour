import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../modules/user/user.interface";
import { envVars } from "../config/env";
import httpStatus from "http-status-codes";

export const checkAuth= (...authRoles:string[])=>async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const accessToken=req.headers.authorization;
        if(!accessToken){
            throw new AppError(403,"No token received")
               
        }
        const verifiedToken=req.user;
        // const verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
        // const verifiedToken=jwt.verify(accessToken as string,"secret")
        if(!verifiedToken){
            console.log(verifiedToken);
            throw new AppError(403,`You are not authorized  ${verifiedToken}`)
        }
        if((verifiedToken  as JwtPayload).role!==Role.ADMIN){
             throw new AppError(403,"You are not permitted to view this route")
        }
        if(!authRoles.includes(verifiedToken.role)){
            throw new AppError(403,"You are not permitted to view this route!!!")
        }
        console.log(verifiedToken)
        req.user=verifiedToken
        next()
    }
    catch(error){
  next(error)
    }
}
