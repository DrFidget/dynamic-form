export class Field {
  constructor(
    id,
    fieldName,
    fieldType,
    options,
    data,
    enabled,
    numberDecimal,
    numberMin,
    numberMax
  ) {
    let x = {};
    options ? (x.options = options) : null;
    numberDecimal ? x.numberDecimal : null;
    numberMin ? (x.min = numberMin) : null;
    numberMax ? (x.max = numberMax) : null;
    data ? (x.data = data) : null;
    x.disabled = !enabled;

    this.inputProperties = x;
    this.dataValues = {
      id: id,
      fieldName: fieldName,
      fieldType: fieldType,
      value: null,
    };
  }

  updateValue(value) {
    this.dataValues.value = value;
  }

  static getFields(schema) {
    const fields = [];
    schema.forEach((element) => {
      // let enabled = null;
      // element.enabled ? (enabled = element.enabled) : (enabled = true);
      const x = new Field(
        element.id,
        element.fieldName,
        element.fieldType,
        element.options ? element.options : null,
        element.data ? element.data : null,
        element.enabled !== undefined ? element.enabled : true,
        element.numberDecimal ? element.numberDecimal : null,
        element.numberMin ? element.numberMin : null,
        element.numberMax ? element.numberMax : null
      );
      // console.log(x);
      fields.push(x);
    });
    return fields;
  }
}
