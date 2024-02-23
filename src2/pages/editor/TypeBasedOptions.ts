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

    // validation: {
    //   //when validation will be enabled a new compoenent will be loaded with some input fields related to validaion (type,rule,msg,color)
    //   type: "checkbox",
    //   defaultValue: false,
    //   label: "Enable validation",
    // },
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
