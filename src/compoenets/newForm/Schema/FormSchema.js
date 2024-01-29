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
    validation: {
      rules: [
        {
          type: "e",
          rule: "${noifd1} >= 10 && ${noifd1} <= 20",
          msg: "Value must be between 10 and 20",
          color: "red",
        },
      ],
    },
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
          rule: "${evenNum} >= 10 && ${evenNum} <= 20",
          msg: "Value must be between 10 and 20",
          color: "#F9A825",
        },
      ],
    },
  },
  {
    id: "towork",
    fieldName: "Lone Worker",
    fieldType: "checkbox",
    binding: {
      property: "value",
      target: "div55",
      // targetGroup: "loneform",
      targetArray: ["div55", "name"],
      targetProperty: "visible",
    },
  },
  {
    id: "div55",
    fieldName: "",
    fieldType: "divider",
    groupId: "loneform",
    groupVisibility: "false",
  },
  {
    id: "name",
    fieldName: "Name",
    fieldType: "text",
    default: "#VAR_UNAME#",
    enabled: false,
    clearValues: false,
    visible: false,
    groupId: "loneform",
  },
  {
    id: "lookupSpeed",
    fieldName: "Speed MPH",
    fieldType: "list",
    options: ["10", "15"],
    binding: {
      property: "value",
      target: "textDistanceField",
      targetProperty: "value",
      targetPropertyLookup: "table",
    },
  },
  {
    id: "lookupTime",
    fieldName: "Time",
    fieldType: "list",
    options: ["10", "15"],
    binding: {
      property: "value",
      target: "textDistanceField",
      targetProperty: "value",
      targetPropertyLookup: "table", // property for table
    },
  },
  {
    id: "textDistanceField",
    fieldName: "Distance meters",
    fieldType: "text",
    enabled: false,
    lookup: {
      col: "lookupSpeed", // id of 1st field defining the column field
      row: "lookupTime", // id of 2nd field, defining the row field
      source: [
        {
          MPH: "10",
          10: "367",
          15: "440",
        },
        {
          MPH: "15",
          10: "550",
          15: "660",
        },
      ],
    },
  },
  {
    id: "com1",
    fieldName: "Comments. We are also cloning value in comments field",
    fieldType: "text",
    groupId: "com2",
    groupVisibility: "false",
    required: true,
    clearValues: false,
    visible: false,
    binding: {
      property: "value",
      target: "com",
      targetProperty: "value",
    },
  },
  {
    id: "com",
    fieldName: "Comments. We are also cloning value in comments field",
    fieldType: "text",
    clearValues: false,
    groupId: "com3",
    groupVisibility: "true",
    binding: {
      property: "value",
      target: "com1",
      targetProperty: "value",
    },
  },
  {
    id: "tawer",
    altId: "top_taw",
    fieldName: "TAW",
    fieldType: "checkbox",
    binding: {
      property: "value",
      target: "t-time",
      targetGroup: "serial",
      targetArray: [
        "t-time", // id of 1st child field
        "t-dist", // id of 2nd child field
      ],
      targetProperty: "visible",
    },
  },
  {
    id: "t-time",
    fieldName: "Clearing Time (sec)",
    fieldType: "list",
    options: ["10 ", "15 ", "20 ", "25 ", "30 "],
    visible: false,
  },
  {
    id: "t-dist",
    fieldName: "Sight Distance",
    fieldType: "text",
    required: true,
    visible: false,
  },
  {
    id: "na",
    fieldName: "This checkbox will set visible false of associated fields",
    fieldType: "checkbox",
    binding: {
      property: "value",
      target: "trname",
      targetGroup: "mint",
      targetProperty: "visible",
      logicalFunction: "!",
    },
  },
  {
    id: "trname",
    fieldName: "NAME",
    fieldType: "text",
    numberDecimal: true,
    required: true,
    groupId: "mint",
  },
];
