let dict = {
  des: "description",
  key1: "UM",
  key2: "item",
};
export const ExternalMethodUtils = {
  getArgList: (args) => {
    let regex = /'(.*?)'/g;
    let matches = args.match(regex);
    let ArgList = matches.map((match) => match.slice(1, -1));
    return ArgList;
  },

  getMatchingObject: (DB, Field, Value, opt1) => {
    for (let x of DB) {
      let matchingEntry = x.opt1.filter((e) => e[Field] === Value);
      if (matchingEntry.length > 0) return matchingEntry;
    }
  },
  filterOptionFromLookupList: (ObjList, Arg) => {
    const foundField = ObjList.appFormLookupList.find((e) => e[Arg]);
    if (foundField) return [{ options: foundField[Arg].options }];
  },

  getFiledsFromMaterialList: (ObjList, Arg, flag) => {
    let argument = Arg;
    if (flag) {
      argument = dict[ExternalMethodUtils.FilterArguments(Arg)[0]];
    }
    return ObjList.reduce((acc, e) => {
      if (e[argument]) acc.push(e[argument]);
      return acc;
    }, []);
  },
  FilterArguments: (x) => {
    const regex = /\${(.*?)}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(x)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  },

  formatListData: (formatPattren, objList) => {
    let formatArgs = ExternalMethodUtils.FilterArguments(formatPattren);
    let ValList = [];
    objList.forEach((obj) => {
      let val = obj[dict[formatArgs[0]]];
      if (formatArgs.length > 1) {
        val += "(";
        for (let i = 1; i < formatArgs.length; i++) {
          let attribute = obj.opt1?.attributes.find(
            (attr) => attr.key === dict[formatArgs[i]]
          );
          if (attribute) {
            val += attribute.value;
            if (i < formatArgs.length - 1) {
              val += "/";
            }
          }
        }
        val += ")";
      }
      if (val !== undefined) {
        ValList.push(val);
      }
    });

    return ValList;
  },
  sortOptionsAndData: (options, data) => {
    if (!data) {
      options.sort();
      return [options, null];
    } else {
      let zipped = options.map((option, index) => ({
        option,
        data: data[index],
      }));
      zipped.sort((a, b) => a.option.localeCompare(b.option));
      let sortedOptions = zipped.map((item) => item.option);
      let sortedData = zipped.map((item) => item.data);
      return [sortedOptions, sortedData];
    }
  },
};
