import express, { Router } from "express";

import { authToken, UserAuthMethods } from "./Auth.service.js";

const userAuthRouter: Router = express.Router();

userAuthRouter.get("/", authToken);
userAuthRouter.post("/signup", UserAuthMethods.signup);
userAuthRouter.post("/login", UserAuthMethods.login);

export { userAuthRouter };
