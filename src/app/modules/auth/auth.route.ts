import { Router } from "express";
import { authControllers } from "./auth.controller";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { object } from "zod";

const router =Router()

router.post("/login",authControllers.credentialsLogin)
router.post("refresh-token",authControllers.getNewAccessToken)
router.post("/logout",authControllers.logout)
router.post("/reset-password",checkAuth(...object.values(Role)),authControllers.resetPassword)
export const AuthRoutes=router;