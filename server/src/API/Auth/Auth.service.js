"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthMethods = void 0;
var Auth_model_js_1 = require("./Auth.model.js");
var bcrypt_1 = require("bcrypt"); // Assuming you have a separate file for token generation
exports.UserAuthMethods = {
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userBody, user, passwordMatch, token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userBody = req.body;
                    return [4 /*yield*/, Auth_model_js_1.default.findOne({
                            email: userBody.email,
                        })];
                case 1:
                    user = (_a.sent());
                    if (!user) {
                        return [2 /*return*/, res.status(404).send("User not found")];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(userBody.password, user.password)];
                case 2:
                    passwordMatch = _a.sent();
                    if (!passwordMatch) {
                        return [2 /*return*/, res.status(401).send("Invalid password")];
                    }
                    token = user.generateAuthToken();
                    res.status(200).send(token);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Login error:", error_1);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userBody, userExists, hashedPassword, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    userBody = req.body;
                    return [4 /*yield*/, Auth_model_js_1.default.findOne({ email: userBody.email })];
                case 1:
                    userExists = _a.sent();
                    if (userExists) {
                        return [2 /*return*/, res.status(409).send("Email already in use")];
                    }
                    return [4 /*yield*/, bcrypt_1.default.hash(userBody.password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, new Auth_model_js_1.default(__assign(__assign({}, userBody), { password: hashedPassword })).save()];
                case 3:
                    _a.sent();
                    res.status(201).send("Created a new account");
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Signup error:", error_2);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
