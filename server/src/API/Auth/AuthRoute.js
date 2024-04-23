"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthRouter = void 0;
var express_1 = require("express");
var Auth_service_js_1 = require("./Auth.service.js");
var userAuthRouter = express_1.default.Router();
exports.userAuthRouter = userAuthRouter;
userAuthRouter.post("/signup", Auth_service_js_1.UserAuthMethods.signup);
userAuthRouter.post("/login", Auth_service_js_1.UserAuthMethods.login);
