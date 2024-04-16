import express from "express";
import { formRouter } from "./routes/index.js";
import cors from "cors";
import mongoose from "mongoose";
import { formResponseRouter } from "./API/FormResponese/FormResponeRoute.js";
import dotenv from "dotenv";
import { userAuthRouter } from "./API/Auth/AuthRoute.js";
dotenv.config();
const app = express();
const port = 9000;
app.use(express.json());
app.use(cors());
app.use("/form", formRouter);
app.use("/formResponse", formResponseRouter);
app.use("/userAuth", userAuthRouter);
app.listen(port, () => {
    console.log("server is running on port ", port);
});
const URI = "mongodb://localhost:27017/FormSchema";
mongoose
    .connect(URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
//# sourceMappingURL=index.js.map