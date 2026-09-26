import express from "express"
import { getCurrentUser } from "../controllers/user.controllers"

const userRouter=express.Router()

userRouter.get("/me",isAuth,getCurrentUser)

export default userRouter