"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var FormResponse = new Schema({
    // FormName: String,
    FormId: String,
    Responses: [
        {
            // id: String,
            timeStamp: String,
            response: Array,
        },
    ],
});
var Response = model("Response", FormResponse);
exports.default = Response;
