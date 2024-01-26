export const getObjFromId = (id, formSchema) => {
  return formSchema.find((element) => element.dataValues.id === id);
};
