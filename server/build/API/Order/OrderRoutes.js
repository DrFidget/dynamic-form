import express from "express";
import { OrderActions } from "./Order.service.js";
import { authenticateToken } from "../Auth/Auth.service.js";
const OrderRouter = express.Router();
OrderRouter.post("/", OrderActions.addOrder);
OrderRouter.get("/", authenticateToken, OrderActions.getOrders);
OrderRouter.get("/:id", OrderActions.getOrder);
OrderRouter.put("/:id", authenticateToken, OrderActions.updateOrder);
OrderRouter.delete("/:id", authenticateToken, OrderActions.deleteOrder);
export default OrderRouter;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaXMiOiI2NjFlMzU1ZjNkZTMzYWZiZmRiMzYxZmQiLCJpYXQiOjE3MTM1MjE5NTYsImV4cCI6MTcxNDEyNjc1Nn0.h4JOVw-9_An3svVND3N58sRYootfwrckRweCMGGKBds
//# sourceMappingURL=OrderRoutes.js.map