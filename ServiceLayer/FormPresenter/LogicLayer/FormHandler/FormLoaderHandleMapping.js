import { formLoaderUtils } from "./FormLoaderUtils";
import { replaceVariables } from "./FormLoaderHandleChange";
export const MappingMethods = {
  hardCopyFormSchema: (updatedFields, updatedSchema) => {
    if (updatedFields.length === 0) return updatedSchema;
    updatedFields.forEach((uf) => {
      let fi = updatedSchema.findIndex(
        (sf) => sf.dataValues.id === uf.dataValues.id
      );
      if (fi !== -1) updatedSchema[fi] = { ...uf };
    });
    return updatedSchema;
  },

  getMappingTargetFields: (mapping, fields) => {
    if (!mapping || !fields.length) return [];

    if (mapping.targetArray)
      return fields.filter((field) =>
        mapping.targetArray.includes(field.dataValues.id)
      );

    if (mapping.targetGroup)
      return fields.filter(
        (field) =>
          field.optionalProperties &&
          field.optionalProperties.groupId === mapping.targetGroup
      );

    if (mapping.target)
      return fields.filter((field) => field.dataValues.id === mapping.target);

    return [];
  },
  dealActualMapping: (targetArray, targetProperty, propertyVal) => {
    return targetArray.map((e) => {
      formLoaderUtils.targetPropertyMethods[targetProperty](e, propertyVal);
      return e;
    });
  },
  dealFormatMapping: (targets, dict, mappingObj) => {
    let rule = replaceVariables(mappingObj.formatFunction, dict, true);
    return targets.map((e) => {
      e.dataValues.value = rule;
      return e;
    }); //return updated fields []
  },
  HandleSingleMapObj: (mappingObj, SourceObject, binding, formSchema, dict) => {
    //check if options  are provided or not. If yes then use them to map the fields otherwise use default mapping method.
    let target = [];
    let targetProperty = null;
    let propertyVal = null;
    let updatedFields = [];

    if (mappingObj.target || mappingObj.targetGroup || mappingObj.targetArray) {
      target = MappingMethods.getMappingTargetFields(mappingObj, formSchema);
    } else {
      target = formLoaderUtils.getTargetFields(binding, formSchema);
    }
    /// target [{},{},{}]
    if (target.length === 0) return [];

    if (mappingObj.options) {
      if (!mappingObj.options.includes(SourceObject.dataValues.value))
        return updatedFields;

      if (mappingObj.mapTo) {
        targetProperty = binding.targetProperty;
        propertyVal = mappingObj.mapTo === "true" ? true : false;
      } else {
        targetProperty = mappingObj.targetProperty
          ? mappingObj.targetProperty
          : binding.targetProperty;
        propertyVal = SourceObject.dataValues.value;
      }
      //now i have target [{},{}] / targetproperty (value/enable/visible) / propertyVal (val/True-False) to change in obj

      updatedFields = MappingMethods.dealActualMapping(
        target,
        targetProperty,
        propertyVal
      );
    }
    if (mappingObj.formatFunction) {
      updatedFields = MappingMethods.dealFormatMapping(
        target,
        dict,
        mappingObj
      );
    }
    return updatedFields;
  },

  MappingHandler: (binding, SourceObject, formSchema, dict) => {
    let mapping = binding.mapping;
    let updatedSchema = [...formSchema];
    let updatedFields = [];

    mapping.forEach((e) => {
      updatedFields = MappingMethods.HandleSingleMapObj(
        e,
        SourceObject,
        binding,
        formSchema,
        dict
      );
      updatedSchema = MappingMethods.hardCopyFormSchema(
        updatedFields,
        updatedSchema
      );
    });

    return updatedSchema;
  },
};
// formatFunction: "consider  this ${num-ptime}",
