import express from "express";
import { ResponseActions } from "./FormResponse.service.js";
const formResponseRouter = express.Router();
formResponseRouter.post("/:id", ResponseActions.AddNewResponese);
formResponseRouter.get("/:id", ResponseActions.GetResponsesByFormId);
formResponseRouter.get("/:formId/:resId", ResponseActions.GetResponseByID);
formResponseRouter.delete("/:formId/:resId", ResponseActions.deleteResponseByID);
formResponseRouter.put("/:formId/:resId", ResponseActions.updateResponseByID);
export { formResponseRouter };
//# sourceMappingURL=FormResponeRoute.js.map