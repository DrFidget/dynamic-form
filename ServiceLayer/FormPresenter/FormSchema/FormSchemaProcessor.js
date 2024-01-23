import { DefaultMethods } from "./DefaultFunctions";
import { InternalDefaultfunctions } from "./InternalDefaultmethods";

export const FormSchemaProcessor = {
  generateFormFields: (schema) => {
    return schema.map((field) =>
      FormSchemaProcessor.generateFormField(field, schema)
    );
  },
  generateFormField: (field, schema) => {
    if (!field.id) throw "field Id not defined";
    let inputProp = {};
    FormSchemaProcessor.generalInputKeys(inputProp, field);
    FormSchemaProcessor.typeBasedInputKeys(inputProp, field);
    let ValidationProps = {};
    FormSchemaProcessor.getValidationRules(ValidationProps, field);
    let obj = {
      validationRules:
        Object.keys(ValidationProps).length > 0 ? ValidationProps : null,
      inputProperties: inputProp,
      dataValues: {
        id: field.id,
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        value: null || inputProp.default,
      },
    };
    return obj;
  },
  generalInputKeys: (x, field) => {
    for (let key in allowedInputKeys) {
      const inputKey = allowedInputKeys[key].keyName;
      const inputValue = field[key];

      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = allowedInputKeys[key].method(inputValue);
      }
    }
  },

  typeBasedInputKeys: (x, field) => {
    const allowedKeys = typeBasedInputKeys[field.fieldType];

    if (!allowedKeys) return;

    for (let key in allowedKeys) {
      const inputKey = allowedKeys[key].keyName;
      const inputValue = field[key];

      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = allowedKeys[key].method(inputValue);
      }
    }
  },

  getValidationRules: (x, field) => {
    for (let key in validationRules) {
      const inputKey = validationRules[key].keyName;
      const inputValue = field[key];

      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = validationRules[key].method(inputValue);
      }
    }
  },
};

const validationRules = {
  validation: {
    method: (kv) => {
      let x = kv;
      x.isValid = false;
      x.message = "";
      x.color = "";
      return x;
    },
    keyName: "validation",
  },
};
const allowedInputKeys = {
  enabled: {
    method: (kv) => !kv,
    keyName: "disabled",
  },
  default: {
    method: (kv) => {
      // console.log(kv);
      let x = DefaultMethods[kv];
      if (!x) x = InternalDefaultfunctions[kv];
      if (!x) throw "method not found";
      return x();
    },
    keyName: "default",
  },
  // validation: {
  //   method: (kv) => {
  //     let x = kv;
  //     x.isValid = false;
  //     x.message = "";
  //     x.color = "";
  //     return x;
  //   },
  //   keyName: "validation",
  // },
};

const allowedNumberInputKeys = {
  numberDecimal: {
    method: (kv) => {
      if (kv) return 0.1;
    },
    keyName: "step",
  },
  numberMin: {
    method: (kv) => kv,
    keyName: "min",
  },
  numberMax: {
    method: (kv) => kv,
    keyName: "max",
  },
};
const optionDataGroup = {
  options: { method: (kv) => kv, keyName: "options" },
  data: { method: (kv) => kv, keyName: "data" },
};

const typeBasedInputKeys = {
  number: allowedNumberInputKeys,
  radioList: { ...optionDataGroup },
  table: { ...optionDataGroup },
  list: { ...optionDataGroup },
};
