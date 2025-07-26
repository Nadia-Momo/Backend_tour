
import { UserControllers } from "./user.controller";import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Router } from "express";
import { Role } from "./user.interface";


const router=Router();
// eslint-disable-next-line @typescript-eslint/no-unused-vars

router.post('/register',validateRequest(createUserZodSchema),UserControllers.createUser)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/all-users',checkAuth("ADMIN","SUPER_ADMIN"),UserControllers.getAllUsers)
router.patch('/:id',checkAuth(...Object.values(Role)),UserControllers.updateUser)
//api/v1/user/:id
export const UserRoute=router;
