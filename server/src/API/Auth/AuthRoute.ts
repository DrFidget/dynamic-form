import express, { Router } from "express";

import { UserAuthMethods } from "./Auth.service.js";

const userAuthRouter: Router = express.Router();

userAuthRouter.post("/signup", UserAuthMethods.signup);
userAuthRouter.post("/login", UserAuthMethods.login);

export { userAuthRouter };
