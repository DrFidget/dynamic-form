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
    for (let k in allowedInputKeys) {
      field[k] &&
        (x[allowedInputKeys[k].keyName] = allowedInputKeys[k].method(field[k]));
    }
  },
  typeBasedInputKeys: (x, field) => {
    let allowedInputKeys = typeBasedInputKeys[field.fieldType];
    if (!allowedInputKeys) return;
    for (let k in allowedInputKeys) {
      field[k] &&
        (x[allowedInputKeys[k].keyName] = allowedInputKeys[k].method(field[k]));
    }
  },
};

const allowedInputKeys = {
  enabled: { method: (kv) => !kv, keyName: "disabled" },
};

const allowedNumberInputKeys = {
  numberDecimal: { method: (kv) => kv, keyName: "numberDecimal" },
  numberMin: { method: (kv) => kv, keyName: "min" },
  numberMax: { method: (kv) => kv, keyName: "max" },
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
