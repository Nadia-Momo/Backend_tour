
import { UserControllers } from "./user.controller";
import {   Router } from "express";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
const router=Router();
// eslint-disable-next-line @typescript-eslint/no-unused-vars

router.post('/register',
validateRequest(createUserZodSchema)
,UserControllers.createUser)
router.get('/all-users',UserControllers.getAllUsers)
export const UserRoute=router;

