const FormattingFromString = {
  extractKeyValuePairs: (input: string): Array<[string, string]> => {
    const keyValuePairs: Array<[string, string]> = [];

    input.split(",").forEach((pair: string) => {
      const [key, value] = pair
        .split(":")
        .map((str: string) => str.trim().replace(/["{}]/g, ""));
      keyValuePairs.push([key, value]);
    });

    return keyValuePairs;
  },
  getListOfKeyValues: (str: string): Array<Array<[string, string]>> => {
    const matches = str.match(/{([^}]+)}/g);
    let x: Array<Array<[string, string]>> = [];
    if (matches) {
      matches.forEach((e: string) => {
        x.push(FormattingFromString.extractKeyValuePairs(e));
      });
    }
    return x;
  },
  FormatAndReturn: (
    inputData: Array<Array<[string, string]>>
  ): Array<Array<string>> => {
    const formattedData: Array<Array<string>> = [];

    const header: Array<string> = [inputData[0][0][0]];
    for (let i = 0; i < inputData.length; i++) {
      header.push(inputData[i][0][1]);
    }

    formattedData.push(header);

    for (let i = 1; i < inputData[0].length; i++) {
      const rowData: Array<string> = [];
      for (let j = 0; j < inputData.length; j++) {
        if (j == 0) rowData.push(inputData[0][j + 1][0]);
        rowData.push(inputData[j][i][1]);
      }
      formattedData.push(rowData);
    }

    return formattedData;
  },
};

export const formatFromString = (str: string) => {
  let x = FormattingFromString.getListOfKeyValues(str);
  return FormattingFromString.FormatAndReturn(x);
};
