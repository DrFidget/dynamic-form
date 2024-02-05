import { externalDatabase } from "./ExternalDatabase";
import { ExternalMethodUtils } from "./ExternalMethodsUtils";

const FetchAssetData = (args) => {
  let Arguments = ExternalMethodUtils.getArgList(args);
  if (!Arguments || Arguments.length === 0) return [{ options: [] }];
  let AssetList = ExternalMethodUtils.getMatchingObject(
    externalDatabase,
    "_id",
    "123"
  );
  if (AssetList)
    return ExternalMethodUtils.filterOptionFromLookupList(
      AssetList[0],
      Arguments[0]
    );
  return [{ options: [] }];
};

const FetchMaterialList = (args) => {
  let Arguments = ExternalMethodUtils.getArgList(args);
  if (!Arguments || Arguments.length === 0) return [{ options: [] }];
  let MaterialList = ExternalMethodUtils.getMatchingObject(
    externalDatabase,
    "listName",
    "materialTypes"
  );
  let optionList = null;
  let dataList = null;
  let resultList = ExternalMethodUtils.getFiledsFromMaterialList(
    MaterialList,
    "description"
  ); //['val1','val2'],

  if (Arguments[1]) {
    //format the data to be returned
    optionList = ExternalMethodUtils.formatListData(Arguments[1], MaterialList);
  }
  if (Arguments[2]) {
    dataList = ExternalMethodUtils.getFiledsFromMaterialList(
      MaterialList,
      Arguments[2],
      true
    );
  }
  if (Arguments[3]) {
    if (Arguments[3] === "sort")
      [optionList, dataList] = ExternalMethodUtils.sortOptionsAndData(
        optionList,
        dataList
      );
  }

  let x = { options: resultList };
  if (optionList) x.options = optionList;
  if (dataList) x.data = dataList;

  return [x];
};

// const abc = {
//   default:
//     //     "#APPLICATIONLOOKUP.lists('materialTypes','${des} (${key1}, ${key2})','${des}','sort')#",
//     "#ASSET.lists('busNomenclature')#",
// };
export const externalMethods = {
  "#ASSET.lists": FetchAssetData,
  "#APPLICATIONLOOKUP.lists": FetchMaterialList,
};
