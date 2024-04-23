"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var jsonwebtoken_1 = require("jsonwebtoken");
var userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
    var token = jsonwebtoken_1.default.sign({ _is: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};
var UserAuthModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserAuthModel;
