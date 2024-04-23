"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formResponseRouter = void 0;
var express_1 = require("express");
var FormResponse_service_js_1 = require("./FormResponse.service.js");
var formResponseRouter = express_1.default.Router();
exports.formResponseRouter = formResponseRouter;
formResponseRouter.post("/:id", FormResponse_service_js_1.ResponseActions.AddNewResponese);
formResponseRouter.get("/:id", FormResponse_service_js_1.ResponseActions.GetResponsesByFormId);
formResponseRouter.get("/:formId/:resId", FormResponse_service_js_1.ResponseActions.GetResponseByID);
formResponseRouter.delete("/:formId/:resId", FormResponse_service_js_1.ResponseActions.deleteResponseByID);
formResponseRouter.put("/:formId/:resId", FormResponse_service_js_1.ResponseActions.updateResponseByID);
