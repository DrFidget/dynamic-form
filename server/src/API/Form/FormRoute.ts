import express, { Router } from "express";

import { formMethods } from "./Form.service.js";

const formRouter: Router = express.Router();

formRouter.post("/", formMethods.createForm);
formRouter.get("/", formMethods.getForm.all);
formRouter.get("/:id", formMethods.getForm.byId);
formRouter.put("/:id", formMethods.updateForm);
formRouter.delete("/:id", formMethods.deleteForm);

export { formRouter };
