import {   Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
const router=Router();

router.post('/register',
 validateRequest(createUserZodSchema),UserControllers.createUser)
router.get('/all-users',UserControllers.getAllUsers)
export const UserRoute=router;
//1.ZOD VALIDATION
//2.EMAIL,PASSWORD BASED Custom authentication dekhbo
//3.zwt role based authorization dekhbo
//4.zod diye req body ta sanitization and validation ei duita kaj korer jonno bebohar korbo