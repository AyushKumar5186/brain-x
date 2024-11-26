import { Router } from "express";
import { login, signup } from "../controllers/AuthController";

const AuthRoutes:Router = Router();



AuthRoutes.post("/signup", signup as any )

AuthRoutes.post("/login", login as any)

export default AuthRoutes;