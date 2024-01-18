export const FormSchema = [
  {
    id: "date",
    fieldName: "Date",
    fieldType: "date",
    default: "#VAR_NOW#",
    enabled: false,
    clearValues: false,
  },
  // VAR_NOW variable shows real time date and time

  {
    id: "empl",
    fieldName: "User Name",
    fieldType: "text",
    default: "#VAR_UNAME#",
    enabled: false,
    clearValues: false,
  },
  // VAR_UNAME variable shows the logged in user name

  {
    id: "date1",
    fieldName: "Date",
    fieldType: "date",
  },
  // This field type takes date input from the calendar.

  {
    id: "time",
    fieldName: "Time",
    fieldType: "time",
  },
  // This field type takes time input from the clock.

  {
    id: "datetime",
    fieldName: "Date and Time",
    fieldType: "datetime",
  },
  // This field type takes date and time input from calendar and clock.

  {
    id: "UserMobileNo",
    fieldName: "Contact Number",
    fieldType: "text",
    default: "#VAR_UMOBILE#",
  },
  // VAR_UMOBILE variable shows logged in user mobile no.

  {
    id: "id_lat",
    fieldName: "Latitude",
    fieldType: "text",
    default: "#VAR_CLAT#",
  },
  // VAR_CLAT variable shows current latitude value of the logged in user.

  {
    id: "id_long",
    fieldName: "Longitude",
    fieldType: "text",
    default: "#VAR_CLONG#",
  },
  // VAR_CLONG variable shows current longitude value of the logged in user.

  {
    id: "div",
    fieldName: "",
    fieldType: "divider",
  },
  // This field type shows a dotted line. It is use to separate the fields

  {
    id: "label",
    fieldName: "Title/ Label",
    fieldType: "label",
  },
  // This field type shows labels in app form.

  {
    id: "texte",
    fieldName: "Text/ Input Field",
    fieldType: "text",
  },
  // This field type takes alphanumeric value input.
  {
    id: "noif",
    fieldName: "Number Input Field",
    fieldType: "number",
  },
  // This field type takes a number value.

  {
    id: "noifd",
    fieldName: "Number Input Field with Decimal",
    fieldType: "number",
    numberDecimal: true,
  },
  // numberDecimal variable allows the user to take the decimal value as input.

  {
    id: "noifd1",
    fieldName: "Number field with Max and Min Number Validation",
    fieldType: "number",
    numberDecimal: false,
    numberMin: "10",
    numberMax: "20",
  },
  // User can only enter numeric value between 10 and 20.

  {
    id: "radio",
    fieldName: "Radio Buttons",
    fieldType: "radioList",
    options: ["Lahore", "Karachi", "Islamabad", "Peshawar", "Faisalabad"],
    data: ["LHR", "KHI", "ISB", "PSH", "FSD"],
  },
  /* Options variable shows the radio list options and data variable shows the data it's going to save across each value.(fieldType radioList is for radio buttons)
   */

  {
    id: "radio1",
    fieldName: "Drop Down List",
    fieldType: "list",
    options: ["Lahore", "Karachi", "Islamabad", "Peshawar", "Faisalabad"],
  },
  //  Option variable shows the drop down list option. (fieldType list is for drop down list)

  {
    id: "tables",
    fieldName: "Table",
    fieldType: "table",
    options: [
      {
        id: "mile12",
        fieldName: "Text Field",
        fieldType: "text",
      },
      {
        id: "radio12",
        fieldName: "Drop Down List",
        fieldType: "list",
        options: ["Lahore", "Karachi", "Islamabad", "Peshawar", "Faisalabad"],
      },
    ],
  },
  // fieldType “table” used for tables in app form.

  {
    id: "check",
    fieldName: "CheckBox",
    fieldType: "checkbox",
  },
  // fieldType “checkbox” is for checkbox fields.

  {
    id: "Serial Number1",
    fieldName: "Signature",
    fieldType: "scribble",
  },
  // fieldType “scribble” is for Signature input.

  {
    id: "sigPic",
    fieldName: "Image",
    fieldType: "image",
  },
  /* fieldType “image” for taking photos using a phone camera or selecting a photo from a mobile gallery.
   */

  {
    id: "evenNum",
    fieldName: "Number Input (100-200) Warning Message",
    fieldType: "number",
    validation: {
      rules: [
        {
          type: "w",
          rule: "${evenNum} >= 100 && ${evenNum} <= 200",
          msg: "Value must be between 100 and 200",
          color: "#F9A825",
        },
      ],
    },
  },

  // {
  //   id:"option",
  //   type:"option"
  // }
];
