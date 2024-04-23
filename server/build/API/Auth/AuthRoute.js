import express from "express";
import { authToken, UserAuthMethods } from "./Auth.service.js";
const userAuthRouter = express.Router();
userAuthRouter.get("/", authToken);
userAuthRouter.post("/signup", UserAuthMethods.signup);
userAuthRouter.post("/login", UserAuthMethods.login);
export { userAuthRouter };
//# sourceMappingURL=AuthRoute.js.map