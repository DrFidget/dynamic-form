"use strict";
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
exports.ResponseActions = void 0;
var FormResponse_model_js_1 = require("./FormResponse.model.js");
exports.ResponseActions = {
    AddNewResponese: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, _a, singleResponse, timeStamp, responseInDb, newResponse, e_1, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    formId = req.params.id;
                    _a = req.body, singleResponse = _a.singleResponse, timeStamp = _a.timeStamp;
                    return [4 /*yield*/, FormResponse_model_js_1.default.findOne({ FormId: formId })];
                case 1:
                    responseInDb = _b.sent();
                    if (!!responseInDb) return [3 /*break*/, 6];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    newResponse = new FormResponse_model_js_1.default({
                        FormId: formId,
                        Responses: [
                            {
                                timeStamp: timeStamp,
                                response: singleResponse,
                            },
                        ],
                    });
                    return [4 /*yield*/, newResponse.save()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6:
                    responseInDb.Responses.push({
                        timeStamp: timeStamp,
                        response: singleResponse,
                    });
                    return [4 /*yield*/, responseInDb.save()];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    res.status(201).send("Posted");
                    return [3 /*break*/, 10];
                case 9:
                    e_2 = _b.sent();
                    console.log(e_2);
                    res.status(401).send(e_2);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); },
    GetResponsesByFormId: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formid, responsesInDb, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    formid = req.params.id;
                    return [4 /*yield*/, FormResponse_model_js_1.default.findOne({ FormId: formid })];
                case 1:
                    responsesInDb = _a.sent();
                    if (!responsesInDb) {
                        res.status(404).json({ message: "No responses found" });
                        return [2 /*return*/];
                    }
                    else {
                        res.status(200).send(responsesInDb.Responses);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.error(e_3);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    GetResponseByID: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, resId_1, responsesInDb, x, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    formId = req.params.formId;
                    resId_1 = req.params.resId;
                    return [4 /*yield*/, FormResponse_model_js_1.default.findOne({ FormId: formId })];
                case 1:
                    responsesInDb = _a.sent();
                    if (!responsesInDb) {
                        res.status(404).send("No responses found");
                    }
                    else {
                        x = responsesInDb.Responses.filter(function (e) { return e._id == resId_1; });
                        res.status(201).send(x);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.error(e_4);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteResponseByID: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, resId_2, responsesInDb, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    formId = req.params.formId;
                    resId_2 = req.params.resId;
                    return [4 /*yield*/, FormResponse_model_js_1.default.findOne({
                            FormId: formId,
                        })];
                case 1:
                    responsesInDb = _a.sent();
                    if (!!responsesInDb) return [3 /*break*/, 2];
                    res.status(404).send("No responses found");
                    return [3 /*break*/, 4];
                case 2:
                    responsesInDb.Responses = responsesInDb.Responses.filter(function (e) { return e._id != resId_2; });
                    return [4 /*yield*/, responsesInDb.save()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    res.status(201).send("deleted");
                    return [3 /*break*/, 6];
                case 5:
                    e_5 = _a.sent();
                    console.error(e_5);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    updateResponseByID: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, resId_3, _a, singleResponse, timeStamp, responsesInDb, x, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    formId = req.params.formId;
                    resId_3 = req.params.resId;
                    _a = req.body, singleResponse = _a.singleResponse, timeStamp = _a.timeStamp;
                    return [4 /*yield*/, FormResponse_model_js_1.default.findOne({ FormId: formId })];
                case 1:
                    responsesInDb = _b.sent();
                    if (!!responsesInDb) return [3 /*break*/, 2];
                    res.status(404).send("No responses found");
                    return [3 /*break*/, 4];
                case 2:
                    x = responsesInDb.Responses.find(function (e) { return e._id == resId_3; });
                    x.response = singleResponse;
                    x.timeStamp = timeStamp;
                    responsesInDb.Responses = responsesInDb.Responses.filter(function (e) { return e._id != resId_3; });
                    responsesInDb.Responses.push(x);
                    return [4 /*yield*/, responsesInDb.save()];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    res.status(201).send("updated");
                    return [3 /*break*/, 6];
                case 5:
                    e_6 = _b.sent();
                    console.error(e_6);
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
};
