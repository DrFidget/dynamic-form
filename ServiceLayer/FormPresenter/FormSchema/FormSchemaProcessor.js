import { DefaultMethods } from "./DefaultMethods/DefaultFunctions";
import { InternalDefaultfunctions } from "./DefaultMethods/InternalDefaultmethods";
import { callExternalMethods } from "./DefaultMethods/CallExternalMethods";

// FormSchemaProcessor object with methods for generating form fields
export const FormSchemaProcessor = {
  // Generate form fields based on the provided schema
  generateFormFields: (schema) => {
    return schema.map((field) =>
      FormSchemaProcessor.generateFormField(field, schema)
    );
  },

  // Generate a single form field based on the provided field and schema
  generateFormField: (field, schema) => {
    // Throw an error if field id is not defined
    if (!field.id) throw "field Id not defined";

    let inputProp = {};
    let OptionalProps = {};

    // Set general input keys
    FormSchemaProcessor.generalInputKeys(inputProp, field);

    // Set type-based input keys
    FormSchemaProcessor.typeBasedInputKeys(inputProp, field);

    // Get optional input keys
    FormSchemaProcessor.getOptionalInputKeys(OptionalProps, field);

    // Set default value for hidden property
    if (!inputProp.hidden) {
      inputProp.hidden = false;
    }

    if (inputProp.default) {
      if (Array.isArray(inputProp.default) && inputProp.options.length === 0) {
        // inputProp.options = [...inputProp.default];
        let x = inputProp.default.find((e) => e.options);
        if (x.options) inputProp.options = x.options;

        if (x.data) inputProp.data = x.data;

        if (!x.value) inputProp.default = "";
      }
    }

    // Create an object representing the form field
    let obj = {
      inputProperties: inputProp,
      dataValues: {
        id: field.id,
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        value: "" || inputProp.default,
      },
    };

    // Add optional properties if any
    if (Object.keys(OptionalProps).length > 0) {
      obj.optionalProperties = OptionalProps;
    }

    return obj;
  },

  // Set general input keys based on the allowedInputKeys configuration
  generalInputKeys: (x, field, skipDefault) => {
    for (let key in allowedInputKeys) {
      // if (key === "default" && skipDefault) continue;
      const inputKey = allowedInputKeys[key].keyName;
      const inputValue = field[key];

      // Set the input property if the value is defined and not null
      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = allowedInputKeys[key].method(inputValue);
      }
    }
  },

  // Set type-based input keys based on the field type
  typeBasedInputKeys: (x, field) => {
    const allowedKeys = typeBasedInputKeys[field.fieldType];

    if (!allowedKeys) return;

    for (let key in allowedKeys) {
      const inputKey = allowedKeys[key].keyName;
      const inputValue = field[key];

      // Set the input property if the value is defined and not null
      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = allowedKeys[key].method(inputValue);
      }
    }
  },

  // Get optional input keys based on the OptionalInputKeys configuration
  getOptionalInputKeys: (x, field) => {
    for (let key in OptionalInputKeys) {
      const inputKey = OptionalInputKeys[key].keyName;
      const inputValue = field[key];

      // Set the input property if the value is defined and not null
      if (inputValue !== undefined && inputValue !== null) {
        x[inputKey] = OptionalInputKeys[key].method(inputValue);
      }
    }
  },
};

// Configuration for optional input keys
const OptionalInputKeys = {
  validation: {
    method: (kv) => {
      // Method to process validation key
      let findErrRule = kv.rules.find((x) => x.type === "e"); //find type = error in rules
      let x = kv;
      x.type = "";
      x.isValid = findErrRule !== undefined ? false : true;
      x.message = "";
      x.color = "";
      return x;
    },
    keyName: "validation",
  },

  binding: {
    method: (kv) => {
      // Method to process binding key
      kv.property = false;
      return kv;
    },
    keyName: "binding",
  },
  groupId: {
    method: (kv) => kv,
    keyName: "groupId",
  },
  groupVisibility: {
    method: (kv) => kv,
    keyName: "groupVisibility",
  },
  lookup: {
    method: (kv) => {
      let x = { ...kv };
      x.col = {
        tableDimension: kv.col,
        value: null,
      };
      x.row = {
        tableDimension: kv.row,
        value: null,
      };
      return x;
    },
    keyName: "lookup",
  },
};

// Configuration for allowed input keys
const allowedInputKeys = {
  enabled: {
    method: (kv) => !kv,
    keyName: "disabled",
  },
  visible: {
    method: (kv) => !kv,
    keyName: "hidden",
  },
  default: {
    method: (kv) => {
      // Method to process default key
      if (typeof kv === "boolean") return kv ? "true" : "false";
      if (kv in DefaultMethods) return DefaultMethods[kv]();
      if (kv in InternalDefaultfunctions) return InternalDefaultfunctions[kv]();
      let x = callExternalMethods(kv);
      if (x && x.length > 0) return x;
      return kv;
    },
    keyName: "default",
  },
  required: {
    method: (kv) => kv,
    keyName: "required",
  },
};

// Configuration for allowed number input keys
const allowedNumberInputKeys = {
  numberDecimal: {
    method: (kv) => {
      // Method to process numberDecimal key
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

// Configuration for option data group
const optionDataGroup = {
  options: { method: (kv) => kv, keyName: "options" },
  data: { method: (kv) => kv, keyName: "data" },
};

// Configuration for type-based input keys
const typeBasedInputKeys = {
  number: allowedNumberInputKeys,
  radioList: { ...optionDataGroup },
  table: { ...optionDataGroup },
  list: { ...optionDataGroup },
};
