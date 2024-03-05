export const TypeBasedOptions = {
  // number:["numberMin","numbeMax","numberDecimal","Validation"]
  number: {
    numberMin: { type: "number", defaultValue: 0, label: "Minimum Value" },

    numberMax: {
      type: "number",
      defaultValue: Infinity,
      label: "Maximum value",
    },

    numberDecimal: {
      // type: "boolean",
      type: "checkbox",
      defaultValue: false,
      label: "Allow decimal",
    },
  },

  list: {
    //react tag input
    options: {
      type: "custom_input", // input word or number and append it in main input field
      label: "Options",
    },
    data: {
      type: "checkbox",
      default: false,
      label: "Map Values to options",
    },
  },
  radiolist: {
    options: {
      type: "custom_input", // input word or number and append it in main input field
      label: "Options",
    },
    data: {
      type: "checkbox",
      default: false,
      label: "Map Values to options",
    },
  },
};
