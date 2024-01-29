export const tableLookupHandle = (TableObj, SourceObj) => {
  let lookupProperty = TableObj.optionalProperties.lookup;

  Object.values(lookupProperty).forEach((element) => {
    if (element.tableDimension === SourceObj.dataValues.id)
      element.value = SourceObj.dataValues.value;
  });
  let row = TableObj.optionalProperties.lookup.row.value;
  let col = TableObj.optionalProperties.lookup.col.value;
  if (row && col) {
    let source = lookupProperty.source.find((ele) => ele.MPH === row);
    TableObj.dataValues.value = source[col];
  }
  return [TableObj];
  //return list of updated fields ORR return TableObj updated
};
