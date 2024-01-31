export const getObjFromId = (id, formSchema) => {
  return formSchema.find((element) => element.dataValues.id === id);
};

export const formLoaderUtils = {
  getTargetFields: (binding, fields) => {
    if (binding.targetArray)
      return fields.filter((field) =>
        binding.targetArray.find((tf) => tf === field.dataValues.id)
      );
    if (binding.targetGroup)
      return fields.filter(
        (field) =>
          field.optionalProperties &&
          field.optionalProperties.groupId === binding.targetGroup
      );
    if (binding.target)
      return fields.filter((field) => field.dataValues.id === binding.target);
  },
  updateTargetProperty: (Obj, binding, fields, dict) => {
    return fields.map((f) => {
      formLoaderUtils.targetPropertyMethods[binding.targetProperty](
        f,
        Obj.dataValues.value,
        binding,
        dict
      );
      return f;
    });
  },
  targetPropertyMethods: {
    value: (objToChange, value, binding) => {
      objToChange.dataValues.value = value;
    },
    enable: (objToChange, enable, binding) => {
      //for enable
      objToChange.inputProperties.enable = enable;
    },
    visible: (objToChange, visibility, binding) => {
      //for visibility
      if (binding && binding.logicalFunction && binding.logicalFunction === "!")
        objToChange.inputProperties.hidden = visibility;
      else objToChange.inputProperties.hidden = !visibility;
    },
  },
};
