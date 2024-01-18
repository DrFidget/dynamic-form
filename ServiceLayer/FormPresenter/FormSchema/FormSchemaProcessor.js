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
    let obj = {
      inputProperties: inputProp,
      dataValues: {
        id: field.id,
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        value: null,
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
};

const allowedInputKeys = {
  enabled: {
    method: (kv) => !kv,
    keyName: "disabled",
  },
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
