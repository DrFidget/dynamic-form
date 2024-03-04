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
  FormatAndReturn: (xtring: Array<Array<[string, string]>>) => {
    let abc: Array<Array<string>> = [];
    let header: Array<string> = [xtring[0][0][0]];
    for (let k = 0; k < xtring.length; k++) {
      header.push(xtring[k][0][1]);
      let aa: Array<string> = [];
      for (let i = 0; i < xtring.length; i++) {
        if (i === 0) {
          aa.push(xtring[i][k + 1][0]);
        }
        aa.push(xtring[i][k + 1][1]);
      }
      abc.push(aa);
    }
    abc.unshift(header);
    return abc;
  },
};

export const formatFromString = (str: string) => {
  let x = FormattingFromString.getListOfKeyValues(str);
  return FormattingFromString.FormatAndReturn(x);
};
