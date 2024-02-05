const assets = [
  {
    _id: "123",
    appFormLookupList: [{ busNomenclature: { options: ["Hello", "Hello2"] } }],
  },
  {
    _id: "224",
    appFormLookupList: [{ busNomenclature: { options: ["H3", "H4"] } }],
  },
];
const appLookups = [
  {
    code: "m1",
    listName: "materialTypes",
    description: "Main Material",
    opt1: {
      attributes: [
        { key: "item", value: "#001" },
        { key: "UM", value: "Each" },
      ],
    },
  },
  {
    code: "m2",
    listName: "materialTypes",
    description: "Second Material",
    opt1: {
      attributes: [
        { key: "item", value: "#002" },
        { key: "UM", value: "LTR" },
      ],
    },
  },
  {
    code: "m2",
    listName: "abc",
    description: "Second Material",
    opt1: {
      attributes: [
        { key: "item No", value: "#002" },
        { key: "UM", value: "LTR" },
      ],
    },
  },
];
const assetLists = [
  {
    listName: "AppLookupLists",
    code: "Asset",
    description: "Asset",
    opt1: assets,
  },
];
const appLookupLists = [
  {
    listName: "AppLookupLists",
    code: "ApplicationLookup",
    description: "Application Lookup",
    opt1: appLookups,
  },
];

export const externalDatabase = [...assetLists, ...appLookupLists];
