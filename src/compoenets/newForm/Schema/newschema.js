export const NewSchema = [
  {
    id: "Inspected",

    fieldName: "Scheduled Inspection",

    fieldType: "checkbox",

    tag: "completionCheck",

    default: false,
  },

  {
    id: "num-ptime",

    fieldName: "Time (sec)",

    fieldType: "number",

    binding: {
      property: "value",

      target: "time-text",

      targetArray: ["time-text"],

      targetProperty: "value",

      mapping: [
        {
          formatFunction: "From: ${num-ptime} to: ${num-warntime}",
        },
      ],
    },

    validation: {
      rules: [
        {
          type: "e",

          rule: "${num-ptime} >= 100 && ${num-ptime} <= 200",

          msg: "value must be between 100 and 200",
        },
      ],
    },
  },

  {
    id: "num-warntime",

    fieldName: "Warning Time(sec)",

    fieldType: "number",

    binding: {
      property: "value",

      target: "time-text",

      targetArray: ["time-text"],

      targetProperty: "value",

      mapping: [
        {
          formatFunction: "From: ${num-ptime} to: ${num-warntime}",
        },
      ],
    },
  },

  {
    id: "time-text",

    fieldName: "Result of two above fields",

    fieldType: "text",
  },

  {
    id: "maxspeed",

    fieldName: "Max Op. Speed (mph)",

    fieldType: "number",

    binding: {
      property: "value",

      target: "warntm",

      targetProperty: "value",

      logicalFunction: "!",

      mathFunction: "${aplen} / ( ${maxspeed} * 1.46667 )",

      fun: {
        type: "round",

        args: ["1"],
      },
    },
  },

  {
    id: "aplen",

    fieldName: "App Length (ft)",

    fieldType: "number",

    binding: {
      property: "value",

      target: "warntm",

      targetProperty: "value",

      logicalFunction: "!",

      mathFunction: "${aplen} / ( ${maxspeed} * 1.46667 )",

      fun: {
        type: "round",

        args: ["1"],
      },
    },
  },

  {
    id: "warntm",

    fieldName: "Warning Time from formula (sec)",

    fieldType: "text",
  },

  {
    id: "ptype",

    fieldName: "Protection Type",

    fieldType: "label",
  },

  {
    id: "t841",

    fieldName: "841",

    fieldType: "checkbox",
  },

  {
    id: "rule1",

    fieldName: "${rule1} >= 100 && ${rule1} <= 200",

    fieldType: "number",

    numberDecimal: false,

    validation: {
      rules: [
        {
          type: "w",

          rule: "${rule1} >= 100 && ${rule1} <= 200",

          msg: "The rule states that a field with an id 'valueId' must have min value of 100 and max of 200",

          color: "#F9A825",
        },
      ],
    },
  },

  {
    id: "rule2",

    fieldName: "${rule2} > 100 && ${rule2} < 200",

    fieldType: "number",

    numberDecimal: false,

    validation: {
      rules: [
        {
          type: "w",

          rule: "${rule2} > 100 && ${rule2} < 200",

          msg: "The rule states that a field with an id 'valueId' must have min value greater than100 and max less than 200",

          color: "#F9A825",
        },
      ],
    },
  },

  {
    id: "email1",

    fieldName: "Email1",

    fieldType: "text",

    validation: {
      rules: [
        {
          type: "w",

          rule: "'${email1}' != ''",

          msg: "The rule states that a field with an id hcou must not be empty.",

          color: "#F9A825",
        },
      ],
    },
  },

  {
    id: "email",

    fieldName: "Email",

    fieldType: "text",

    validation: {
      rules: [
        {
          type: "w",

          rule: "'${email}' == '${email1}' || '${email1}' ==''",

          msg: "The rule states that a field with an id email must be equal to the value with an id email1 and value with an id email1 must not be empty",

          color: "#F9A825",
        },
      ],
    },
  },

  {
    id: "test",

    fieldName: "Condition",

    fieldType: "radioList",

    options: [
      "C - Completed",

      "A/C - Adjusted w/ Comments",

      "R/C - Repaired / Replaced w/ Comments",

      "N - Test Not Applicable",

      "N/A - Test Not Applicable",
    ],

    data: ["C", "A/C", "R/C", "N", "NA"],

    binding: {
      property: "value",

      target: "com1",

      targetGroup: "com2",

      targetProperty: "visible",

      mapping: [
        {
          options: ["A/C"],

          mapTo: "true",

          targetGroup: "com2",
        },

        {
          options: ["R/C"],

          mapTo: "true",

          targetGroup: "com2",
        },

        {
          options: ["C"],

          mapTo: "false",

          targetGroup: "com2",
        },

        {
          options: ["NA"],

          mapTo: "false",

          targetGroup: "com2",
        },

        {
          options: ["N"],

          mapTo: "false",

          targetGroup: "com2",
        },

        {
          options: ["A/C"],

          mapTo: "false",

          targetGroup: "com3",
        },

        {
          options: ["R/C"],

          mapTo: "false",

          targetGroup: "com3",
        },

        {
          options: ["C"],

          mapTo: "true",

          targetGroup: "com3",
        },

        {
          options: ["NA"],

          mapTo: "true",

          targetGroup: "com3",
        },

        {
          options: ["N"],

          mapTo: "true",

          targetGroup: "com3",
        },
      ],
    },
  },

  {
    id: "com1",

    fieldName: "Comments",

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

    fieldName: "Comments",

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
    id: "lookupSpeed",

    fieldName: "Speed MPH",

    fieldType: "list",

    options: [
      "10",

      "15",

      "20",

      "25",

      "30",

      "35",

      "40",

      "45",

      "50",

      "55",

      "60",

      "65",

      "70",

      "75",

      "80",

      "85",

      "90",

      "95",

      "100",

      "105",

      "110",
    ],

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

    options: ["10", "15", "20", "25", "30"],

    binding: {
      property: "value",

      target: "textDistanceField",

      targetProperty: "value",

      targetPropertyLookup: "table",
    },
  },

  {
    id: "textDistanceField",

    fieldName: "Distance meters",

    fieldType: "text",

    enabled: false,

    lookup: {
      col: "lookupSpeed",

      row: "lookupTime",

      source: [
        {
          MPH: "10",

          10: "367",

          15: "440",

          20: "513",

          25: "587",

          30: "660",
        },

        {
          MPH: "15",

          10: "550",

          15: "660",

          20: "770",

          25: "880",

          30: "990",
        },

        {
          MPH: "20",

          10: "733",

          15: "880",

          20: "1027",

          25: "1173",

          30: "1320",
        },

        {
          MPH: "25",

          10: "917",

          15: "1100",

          20: "1283",

          25: "1467",

          30: "1650",
        },

        {
          MPH: "30",

          10: "1100",

          15: "1320",

          20: "1540",

          25: "1760",

          30: "1980",
        },

        {
          MPH: "35",

          10: "1283",

          15: "1540",

          20: "1797",

          25: "2053",

          30: "2310",
        },

        {
          MPH: "40",

          10: "1467",

          15: "1760",

          20: "2053",

          25: "2347",

          30: "2640",
        },

        {
          MPH: "45",

          10: "1650",

          15: "1980",

          20: "2310",

          25: "2640",

          30: "2970",
        },

        {
          MPH: "50",

          10: "1833",

          15: "2200",

          20: "2567",

          25: "2933",

          30: "3300",
        },

        {
          MPH: "55",

          10: "2017",

          15: "2420",

          20: "2823",

          25: "3227",

          30: "3630",
        },

        {
          MPH: "60",

          10: "2200",

          15: "2640",

          20: "3080",

          25: "3520",

          30: "3960",
        },

        {
          MPH: "65",

          10: "2383",

          15: "2860",

          20: "3337",

          25: "3813",

          30: "4290",
        },

        {
          MPH: "70",

          10: "2567",

          15: "3080",

          20: "3593",

          25: "4107",

          30: "4620",
        },

        {
          MPH: "75",

          10: "2750",

          15: "3300",

          20: "3850",

          25: "4400",

          30: "4950",
        },

        {
          MPH: "80",

          10: "2933",

          15: "3520",

          20: "4107",

          25: "4693",

          30: "5280",
        },

        {
          MPH: "85",

          10: "3117",

          15: "3740",

          20: "4363",

          25: "4987",

          30: "5610",
        },

        {
          MPH: "90",

          10: "3300",

          15: "3960",

          20: "4620",

          25: "5280",

          30: "5940",
        },

        {
          MPH: "95",

          10: "3483",

          15: "4180",

          20: "4877",

          25: "5573",

          30: "6270",
        },

        {
          MPH: "100",

          10: "3667",

          15: "4400",

          20: "5133",

          25: "5867",

          30: "6600",
        },

        {
          MPH: "105",

          10: "3850",

          15: "4620",

          20: "5390",

          25: "6160",

          30: "6930",
        },

        {
          MPH: "110",

          10: "4033",

          15: "4840",

          20: "5647",

          25: "6453",

          30: "7260",
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

      targetGroup: "loneform",

      targetProperty: "visible",
    },
  },

  {
    id: "div55",

    fieldName: "hide",

    fieldType: "divider",

    groupId: "loneform",

    groupVisibility: "false",
  },

  {
    id: "top",

    fieldName: "LONE WORKER (to be completed when applicable) hide",

    fieldType: "label",

    visible: true,

    groupId: "loneform",
  },

  {
    id: "div56",

    fieldName: " hide",

    fieldType: "divider",

    visible: true,

    groupId: "loneform",
  },

  {
    id: "name",

    fieldName: "Name hide",

    fieldType: "text",

    default: "#VAR_UNAME#",

    enabled: false,

    clearValues: false,

    visible: true,

    groupId: "loneform",
  },

  {
    id: "date1",

    fieldName: "Date hide",

    fieldType: "date",

    default: "#VAR_NOW#",

    enabled: false,

    clearValues: false,

    visible: true,

    groupId: "loneform",
  },

  {
    id: "sub",

    fieldName: "Subdivision hide",

    fieldType: "text",

    required: true,

    visible: true,

    groupId: "loneform",
  },

  {
    id: "date",

    fieldName: "Date",

    fieldType: "date",

    default: "#VAR_NOW#",

    enabled: false,

    clearValues: false,
  },

  {
    id: "empl",

    fieldName: "Employee In Charge",

    fieldType: "text",

    default: "#VAR_UNAME#",

    enabled: false,

    clearValues: false,
  },

  {
    id: "hcou",

    fieldName: "Head Count",

    fieldType: "text",

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${hcou}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },
  },

  {
    id: "loc2",

    fieldName: "Work Location(s) and Task(s) to be Performed Today",

    fieldType: "text",

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${loc2}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },
  },

  {
    id: "div",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "smr",

    fieldName: "Signal Maintainer Required?",

    fieldType: "label",
  },

  {
    id: "ncinfo",

    fieldName: "(if so, name and contact info)",

    fieldType: "label",
  },

  {
    id: "na",

    fieldName: "N/A",

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

  {
    id: "tocontin",

    fieldName: "CONTACT INFORMATION",

    fieldType: "text",

    numberDecimal: true,

    required: true,

    groupId: "mint",
  },

  {
    id: "div1",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "tline",

    fieldName: "Train Line-Up (if applicable)",

    fieldType: "text",
  },

  {
    id: "locaid",

    fieldName: "Location of First Aid Kit(s) Identified?",

    fieldType: "radioList",

    options: ["Yes", "No"],

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${locaid}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },
  },

  {
    id: "evacplan",

    fieldName: "Evacuation / Emergency Process Reviewed",

    fieldType: "radioList",

    options: ["Yes", "No"],

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${evacplan}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },
  },

  {
    id: "inspecomp",

    fieldName:
      "Tools, Fire Suppression Equipment (if applicable), Pre-Trip Vehicle(s), Machine(s) and other Equipment Inspections Completed? (Do you have everything you require, in serviceable condition, to work safely?)",

    fieldType: "radioList",

    options: ["Yes", "No"],

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${inspecomp}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },

    binding: {
      property: "value",

      target: "open2",

      targetProperty: "visible",

      mapping: [
        {
          options: ["No"],

          mapTo: "true",
        },

        {
          options: ["Yes"],

          mapTo: "false",
        },
      ],
    },
  },

  {
    id: "open2",

    fieldName: "If No, Explain",

    fieldType: "text",

    visible: false,

    required: true,
  },

  {
    id: "rgcsbw",

    fieldName:
      "Rule / General Circular / Safety Bulletin of the Week (See schedule) (Tip: 1st workday, to be reviewed in its entirety with crew. Thereafter, review a smaller section of information each day.)",

    fieldType: "radioList",

    options: ["Yes", "No"],

    required: true,

    validation: {
      rules: [
        {
          type: "s",

          rule: "'${rgcsbw}' != ''",

          msg: "Please first fill all mandatory fields",
        },
      ],
    },
  },

  {
    id: "div2",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "flra",

    fieldName: "FIELD LEVEL RISK ASSESSMENT",

    fieldType: "label",
  },

  {
    id: "div6",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "hexamp",

    fieldName: "HAZARD EXAMPLES",

    fieldType: "label",
  },

  {
    id: "div7",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "access",

    fieldName: "Access / Egress",

    fieldType: "checkbox",
  },

  {
    id: "heavy",

    fieldName: "Heavy Lifting / Material Handling",

    fieldType: "checkbox",
  },

  {
    id: "sharp",

    fieldName: "Sharp Surfaces",

    fieldType: "checkbox",
  },

  {
    id: "anime",

    fieldName: "Animals / Insects",

    fieldType: "checkbox",
  },

  {
    id: "ice",

    fieldName: "Ice",

    fieldType: "checkbox",
  },

  {
    id: "sightline",

    fieldName: "Sightlines",

    fieldType: "checkbox",
  },

  {
    id: "postma",

    fieldName: "Awkward Positions (ergonomics)",

    fieldType: "checkbox",
  },

  {
    id: "inexp",

    fieldName: "Inexperienced Workers",

    fieldType: "checkbox",
  },

  {
    id: "stfa",

    fieldName: "Slips / Trips / Falls",

    fieldType: "checkbox",
  },

  {
    id: "chem",

    fieldName: "Chemicals",

    fieldType: "checkbox",
  },

  {
    id: "wlone",

    fieldName: "Lone Worker",

    fieldType: "checkbox",
  },

  {
    id: "sturckb",

    fieldName: "Struck By / Against",

    fieldType: "checkbox",
  },

  {
    id: "cranesr",

    fieldName: "Cranes / Rigging",

    fieldType: "checkbox",
  },

  {
    id: "mobic",

    fieldName: "Mobile Equipment",

    fieldType: "checkbox",
  },

  {
    id: "sfail",

    fieldName: "Structural Failure",

    fieldType: "checkbox",
  },

  {
    id: "dehyd",

    fieldName: "Dehydration",

    fieldType: "checkbox",
  },

  {
    id: "wnight",

    fieldName: "Night Work",

    fieldType: "checkbox",
  },

  {
    id: "train",

    fieldName: "Train(s)",

    fieldType: "checkbox",
  },

  {
    id: "dust",

    fieldName: "Dust / Flying Particles",

    fieldType: "checkbox",
  },

  {
    id: "noise",

    fieldName: "Noise Obstructions",

    fieldType: "checkbox",
  },

  {
    id: "underg",

    fieldName: "Underground Utilities",

    fieldType: "checkbox",
  },

  {
    id: "electuc",

    fieldName: "Electrocution",

    fieldType: "checkbox",
  },

  {
    id: "hopen",

    fieldName: "Open Holes",

    fieldType: "checkbox",
  },

  {
    id: "uneven",

    fieldName: "Uneven Surfaces / Rough Terrain",

    fieldType: "checkbox",
  },

  {
    id: "blind",

    fieldName: "Equipment Blind Spots",

    fieldType: "checkbox",
  },

  {
    id: "wgrop",

    fieldName: "Other Work Groups",

    fieldType: "checkbox",
  },

  {
    id: "uvexpo",

    fieldName: "UV Exposure",

    fieldType: "checkbox",
  },

  {
    id: "fobj",

    fieldName: "Falling Objects",

    fieldType: "checkbox",
  },

  {
    id: "overhead",

    fieldName: "Overhead Power Lines",

    fieldType: "checkbox",
  },

  {
    id: "vibra",

    fieldName: "Vibration",

    fieldType: "checkbox",
  },

  {
    id: "fatik",

    fieldName: "Fatigue",

    fieldType: "checkbox",
  },

  {
    id: "pinch",

    fieldName: "Pinch Points",

    fieldType: "checkbox",
  },

  {
    id: "weath",

    fieldName: "Weather",

    fieldType: "checkbox",
  },

  {
    id: "fire45",

    fieldName: "Fire",

    fieldType: "checkbox",
  },

  {
    id: "puninta",

    fieldName: "Public Interaction",

    fieldType: "checkbox",
  },

  {
    id: "heiwor",

    fieldName: "Working at Heights",

    fieldType: "checkbox",
  },

  {
    id: "hazmat",

    fieldName: "Hazardous Materials",

    fieldType: "checkbox",
  },

  {
    id: "remoloc",

    fieldName: "Remote Location",

    fieldType: "checkbox",
  },

  {
    id: "div8",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "contpex",

    fieldName: "CONTROLS / PPE EXAMPLES",

    fieldType: "label",
  },

  {
    id: "contpex1",

    fieldName:
      "(Each hazard identified should have a control to protect against it)",

    fieldType: "label",
  },

  {
    id: "div9",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "travel5",

    fieldName: "500' Travelling Distance",

    fieldType: "checkbox",
  },

  {
    id: "hearprot",

    fieldName: "Hearing Protection",

    fieldType: "checkbox",
  },

  {
    id: "signage",

    fieldName: "Flags / Signage",

    fieldType: "checkbox",
  },

  {
    id: "warmup",

    fieldName: "Stretching / Warm-Up Excercies",

    fieldType: "checkbox",
  },

  {
    id: "wspace",

    fieldName: "40' Work Space",

    fieldType: "checkbox",
  },

  {
    id: "jobrif",

    fieldName:
      "Job Briefing w/ RTC or Foreman (Infrastructure Special Instruction 3.0 Lone Worker in your Operating Manual)",

    fieldType: "checkbox",
  },

  {
    id: "stob",

    fieldName: "Substitute the Object",

    fieldType: "checkbox",
  },

  {
    id: "cpoint",

    fieldName: "3-Point Contact",

    fieldType: "checkbox",
  },

  {
    id: "locates",

    fieldName: "Locates",

    fieldType: "checkbox",
  },

  {
    id: "tc900",

    fieldName: "Traffic Control",

    fieldType: "checkbox",
  },

  {
    id: "adev",

    fieldName: "Aerial Devices",

    fieldType: "checkbox",
  },

  {
    id: "ppp410",

    fieldName: "Policies / Procedures / Practices / Rules",

    fieldType: "checkbox",
  },

  {
    id: "tedu",

    fieldName: "Training / Education",

    fieldType: "checkbox",
  },

  {
    id: "bguard",

    fieldName: "Barriers / Guards / Covers",

    fieldType: "checkbox",
  },

  {
    id: "pro841",

    fieldName: "Protection (OCS, 841)",

    fieldType: "checkbox",
  },

  {
    id: "trvwacz",

    fieldName: "Travel Restraint",

    fieldType: "checkbox",
  },

  {
    id: "bumpcap",

    fieldName: "Hard Hat",

    fieldType: "checkbox",
  },

  {
    id: "pglow",

    fieldName: "Protective Gloves",

    fieldType: "checkbox",
  },

  {
    id: "ventil",

    fieldName: "Ventilation",

    fieldType: "checkbox",
  },

  {
    id: "inspequ",

    fieldName: "Equipment Inspection",

    fieldType: "checkbox",
  },

  {
    id: "radiocom",

    fieldName: "Radio Communication",

    fieldType: "checkbox",
  },

  {
    id: "wacaz",

    fieldName: "Work Area Control Zone",

    fieldType: "checkbox",
  },

  {
    id: "eyeprot",

    fieldName: "Eye Protection",

    fieldType: "checkbox",
  },

  {
    id: "spoter",

    fieldName:
      "Safety Watch / Spotter (Infrastructure Special Instruction 4.0 Safety Watch in your Operating Manual)",

    fieldType: "checkbox",
  },

  {
    id: "wagah",

    fieldName: "Work on Ground vs. At Heights",

    fieldType: "checkbox",
  },

  {
    id: "fprevt",

    fieldName: "Fire Prevention / Suppression Equipment",

    fieldType: "checkbox",
  },

  {
    id: "sinspe",

    fieldName: "Site Inspection",

    fieldType: "checkbox",
  },

  {
    id: "sp898",

    fieldName: "",

    fieldType: "label",
  },

  {
    id: "div67",

    fieldName: "",

    fieldType: "divider",
  },

  {
    id: "iopdfs",

    fieldName:
      "Refer to ONTC's Fire Plan, today's Fire Indices and IOP field guide or booklet",

    fieldType: "label",
  },

  {
    id: "sstw",

    fieldName:
      "Fire Plan, IOP Guides and Booklet are available on the Infrastructure mobile devices through SharePoint (OneDrive)",

    fieldType: "label",
  },

  {
    id: "na5",

    fieldName: "N/A",

    fieldType: "checkbox",

    binding: {
      property: "value",

      target: "tbliop",

      targetProperty: "visible",

      logicalFunction: "!",
    },
  },

  {
    id: "tbliop",

    fieldName:
      "Refer to ONTC's Fire Plan, today's Fire Indices and IOP field guide or booklet",

    fieldType: "table",

    options: [
      {
        id: "doper",

        fieldName: "Description of Operation",

        fieldType: "text",
      },

      {
        id: "reqequi",

        fieldName: "Equipment Required",

        fieldType: "text",
      },

      {
        id: "stonin",

        fieldName: "Stoniness",

        fieldType: "radioList",

        options: ["<15%", ">15%"],
      },

      {
        id: "frisk",

        fieldName: "Fire Risk",

        fieldType: "radioList",

        options: ["Very High", "High", "Med", "Low"],
      },

      {
        id: "fuel",

        fieldName: "Fuel Group (+/- modifier)",

        fieldType: "text",
      },

      {
        id: "fic",

        fieldName: "Fire Intensity Code",

        fieldType: "radioList",

        options: ["A", "B", "C", "D", "E"],
      },

      {
        id: "ntac",

        fieldName: "NOT Trained and/or Capable",

        fieldType: "text",
      },

      {
        id: "taco",

        fieldName: "Trained and Capable",

        fieldType: "text",
      },

      {
        id: "sp22",

        fieldName: "",

        fieldType: "label",
      },
    ],
  },

  {
    id: "div10",

    fieldName: "",

    fieldType: "divider",
  },
];
