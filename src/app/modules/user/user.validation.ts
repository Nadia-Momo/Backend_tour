import { isDirty, isValid, z } from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema=z.object({
    name:z.string({invalid_type_error:"Name must be string"}).min(2,{message:"Name too short"}).max(50,{message:"Name too long"}),
        email:z.string({invalid_type_error:"email must be string"}).email({message:"Invalid email address format"})
        .min(5,{message:"Email must be at least 5 characters long"})
        .max(100,{message:"Email cannot exceeded  100 characters"})
        ,
        password:z.string().min(8).regex(/^(?=.*[A-Z])/,{
    message:"Password must contain at least 1  uppercase letter.",
})
.regex(/^(?=.*[!@#$%^&*])/,{
    message:"Password must contain at least 1 special character",
})
.regex(/^(?=.*\d)/,{
    message:"Password must contain at least 1 number",
})
,
phone:z.string().regex(/^(?:\+8801\d{9}|01\d{9})$/,{message:"phone number must be valid for Bangladesh.Format:+8801XXXXXXXXX or 01XXXXXXXXX"})
.optional(),
address:z.string({invalid_type_error:"Address must be string"})
.max(200,{message:"Address cannot exceeded 200 characters"})
.optional()    
//eta nadileo prb nai 
})
export const updateUserZodSchema=z.object({
name:z.string({invalid_type_error:"Name must be string"}).min(2,{message:"Name too short"}).max(50,{message:"Name too long"}).optional(),
password:z.string().min(8).regex(/^(?=.*[A-Z])/,{
    message:"Password must contain at least 1  uppercase letter.",
})
.regex(/^(?=.*[!@#$%^&*])/,{
    message:"Password must contain at least 1 special character",
})
.regex(/^(?=.*\d)/,{
    message:"Password must contain at least 1 number",
}).optional()
,
phone:z.string().regex(/^(?:\+8801\d{9}|01\d{9})$/,{message:"phone number must be valid for Bangladesh.Format:+8801XXXXXXXXX or 01XXXXXXXXX"})
.optional(),
address:z.string({invalid_type_error:"Address must be string"})
.max(200,{message:"Address cannot exceeded 200 characters"})
.optional()    ,
role:z
.enum(Object.values(Role) as [string])
.optional(),
isActive:z
.enum(Object.values(IsActive) as [string])
.optional(),
isDeleted:z
.boolean({invalid_type_error:"isDeleted must be true or false"})
.optional(),
isVerified:z
.boolean({invalid_type_error:"isverified must be true or false"})
.optional()
//eta nadileo prb nai 
})