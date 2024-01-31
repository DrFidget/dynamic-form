import { tableLookupHandle } from "./FormLoaderHandleLookup";
import { MappingMethods } from "./FormLoaderHandleMapping";
import { getObjFromId, formLoaderUtils } from "./FormLoaderUtils";

export const handleBinding = (id, formSchema, dict) => {
  let updatedSchema = [...formSchema];
  let Obj = getObjFromId(id, formSchema);

  if (!Obj.optionalProperties || !Obj.optionalProperties.binding)
    return formSchema;

  let binding = Obj.optionalProperties.binding;
  // check target priority (array , group or single) and get target fields
  let updatedFields = [];

  if (binding.mapping) {
    return MappingMethods.MappingHandler(binding, Obj, formSchema, dict);
  } else {
    let targetFields = formLoaderUtils.getTargetFields(binding, formSchema);
    //[lsit of fields with matched target id]

    if (binding.targetPropertyLookup === "table") {
      updatedFields = tableLookupHandle({ ...targetFields[0] }, Obj);
      // function(tableLookup,object.value,) return updated fields
      // return formSchema;
    } else {
      updatedFields = formLoaderUtils.updateTargetProperty(
        Obj,
        binding,
        targetFields
      );
    }
    // update target property (target property to be updated)

    updatedFields.forEach((uf) => {
      let fi = updatedSchema.findIndex(
        (sf) => sf.dataValues.id === uf.dataValues.id
      );
      if (fi !== -1) updatedSchema[fi] = { ...uf };
    });
  }

  return updatedSchema;
};

const TurnVisibilityFalse = (FormSchema, groupId) => {
  for (let ele of FormSchema) {
    if (ele.optionalProperties && ele.optionalProperties.groupId === groupId) {
      ele.inputProperties.hidden = true;
    }
  }
};

export const HandleGroupVisibility = (FormSchema) => {
  const validGroupValue = (element) =>
    element.optionalProperties &&
    (element.optionalProperties.groupVisibility === "false" ||
      element.optionalProperties.groupVisibility === false);

  FormSchema.filter(validGroupValue).map((element) =>
    TurnVisibilityFalse(FormSchema, element.optionalProperties.groupId)
  );
};
