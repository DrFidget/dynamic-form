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
exports.formMethods = void 0;
var Form_model_js_1 = require("./Form.model.js");
var form = [];
exports.formMethods = {
    createForm: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var CompleteForm, NewForm, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    CompleteForm = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    NewForm = new Form_model_js_1.default({
                        Name: CompleteForm.Name,
                        Schema: CompleteForm.Schema,
                    });
                    return [4 /*yield*/, NewForm.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    res.status(201).send("sent");
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _a.sent();
                    res.send(e_2);
                    res.status(401);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    getForm: {
        byId: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var formId, foundForm, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formId = req.params.id;
                        return [4 /*yield*/, Form_model_js_1.default.findById(formId)];
                    case 1:
                        foundForm = _a.sent();
                        if (!foundForm) {
                            return [2 /*return*/, res.status(404).send("Form not found")];
                        }
                        res.status(200).send(foundForm);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.status(500).send(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        all: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var foundForms, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Form_model_js_1.default.find({})];
                    case 1:
                        foundForms = _a.sent();
                        if (foundForms.length === 0) {
                            return [2 /*return*/, res.status(404).send("Form not found")];
                        }
                        res.status(200).send(foundForms);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res.status(500).send(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    },
    updateForm: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, newForm, existingForm, e_5, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    formId = req.params.id;
                    newForm = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Form_model_js_1.default.findById(formId)];
                case 2:
                    existingForm = _a.sent();
                    if (!existingForm) {
                        return [2 /*return*/, res.status(404).send("Form not found")];
                    }
                    existingForm.Name = newForm.Name || existingForm.Name;
                    existingForm.Schema = newForm.Schema || existingForm.Schema;
                    return [4 /*yield*/, existingForm.save()];
                case 3:
                    _a.sent();
                    res.status(200).send(existingForm);
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _a.sent();
                    res.status(500).send("Internal Server Error");
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_6 = _a.sent();
                    res.status(400).send("Bad Request");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    deleteForm: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var formId, deletedForm, e_7, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    formId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Form_model_js_1.default.findByIdAndDelete(formId)];
                case 2:
                    deletedForm = _a.sent();
                    if (!deletedForm) {
                        return [2 /*return*/, res.status(404).send("Form not found")];
                    }
                    res.status(200).send("Form deleted successfully");
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    console.log(e_7);
                    res.status(500).send("Internal Server Error");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_8 = _a.sent();
                    console.log(e_8);
                    res.status(400).send("Bad Request");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
};
