import express from "express";

import { getUserInfo, getUsers, login, logout, registerUser, googleLogin } from "../controllers/userController.js";
import checkToken from "../middlewares/checkToken.js";
///this is initiating our router
export const userRouter = express.Router();

/// get all users

//// GET /api/users/
userRouter.get("/" , getUsers );
userRouter.get("/userInfo" , checkToken  ,getUserInfo );

/// POST create user 
userRouter.post("/register", registerUser);
///POST login user
userRouter.post("/login",login);

userRouter.post("/google/login", googleLogin);

userRouter.get("/logout",logout);

