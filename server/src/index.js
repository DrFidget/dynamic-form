"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_js_1 = require("./routes/index.js");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var FormResponeRoute_js_1 = require("./API/FormResponese/FormResponeRoute.js");
var dotenv_1 = require("dotenv");
var AuthRoute_js_1 = require("./API/Auth/AuthRoute.js");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 9000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/form", index_js_1.formRouter);
app.use("/formResponse", FormResponeRoute_js_1.formResponseRouter);
app.use("/userAuth", AuthRoute_js_1.userAuthRouter);
app.listen(port, function () {
    console.log("server is running on port ", port);
});
var URI = "mongodb://localhost:27017/FormSchema";
mongoose_1.default
    .connect(URI)
    .then(function () { return console.log("MongoDB connected"); })
    .catch(function (err) { return console.error(err); });
