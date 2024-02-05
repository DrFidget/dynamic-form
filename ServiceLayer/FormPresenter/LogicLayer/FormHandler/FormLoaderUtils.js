import { replaceVariables } from "./FormLoaderHandleChange";
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}
export const getObjFromId = (id, formSchema) => {
  let obj = formSchema.find((element) => element.dataValues.id === id);
  return deepCopy(obj);
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

  mathOperaton: (value, type, args) => {
    switch (type) {
      case "round":
        return value.toFixed(args[0]);
      default:
        break;
    }
  },
  updateTargetProperty: (Obj, binding, fields, dict) => {
    let val = Obj.dataValues.value;
    if (binding.targetProperty === "value" && binding.mathFunction) {
      let actualFunction = replaceVariables(binding.mathFunction, dict);
      try {
        val = eval(actualFunction);
        if (binding.fun)
          val = formLoaderUtils.mathOperaton(
            val,
            binding.fun.type,
            binding.fun.args
          );
      } catch (e) {
        val = "Error in calculation!";
      }
    }
    return fields.map((f) => {
      formLoaderUtils.targetPropertyMethods[binding.targetProperty](
        f,
        val,
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
