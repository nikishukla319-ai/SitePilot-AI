
import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
    billing,
    verifyCheckoutSession
} from "../controllers/billing.controller.js";

const billingRouter = express.Router();

billingRouter.post("/", isAuth, billing);
billingRouter.post("/verify-session", isAuth, verifyCheckoutSession);

export default billingRouter;
