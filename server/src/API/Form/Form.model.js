"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var ValidationRuleSchema = new Schema({
    type: String,
    rule: String,
    msg: String,
    color: String,
});
var BindingMappingSchema = new Schema({
    target: String,
    targetGroup: String,
    targetArray: {
        type: Array,
        default: undefined,
    },
    formatFunction: String,
    options: Array,
    mapTo: String,
});
var FormFieldSchema = new Schema({
    id: String,
    fieldName: String,
    fieldType: String,
    numberMin: Number,
    numberMax: Number,
    numberDecimal: Boolean,
    validation: {
        rules: {
            type: [ValidationRuleSchema],
            default: undefined,
        },
        // rules: Array,
    },
    options: {
        type: Array,
        default: undefined,
    },
    data: {
        type: Array,
        default: undefined,
    },
    visible: Boolean,
    enabled: Boolean,
    required: Boolean,
    altId: String,
    groupId: String,
    tag: String,
    default: String,
    binding: {
        property: String,
        targetProperty: String,
        targetPropertyLookup: String,
        target: String,
        targetGroup: String,
        targetArray: {
            type: Array,
            default: undefined,
        },
        logicalFunction: String,
        mathFunction: String,
        fun: {
            type: String,
            args: Array,
        },
        mapping: {
            type: [BindingMappingSchema],
            default: undefined,
        },
    },
});
var FormSchema = new Schema({
    Name: String,
    Schema: [{}],
});
var Form = model("Form", FormSchema);
exports.default = Form;
