import { getObjFromId } from "./FormLoaderUtils";

export const handleBinding = (id, formSchema) => {
  let Obj = getObjFromId(id, formSchema);

  if (Obj.optionalProperties) {
    let binding = Obj.optionalProperties.binding;
    if (binding) {
      if (binding.targetGroup) {
        let groupId = binding.targetGroup;
        let updatedSchema = formSchema.map((element) => {
          if (
            element.optionalProperties &&
            element.optionalProperties.groupId
          ) {
            let gId = element.optionalProperties.groupId;
            if (gId === groupId) {
              let x = {
                ...element,
                inputProperties: {
                  ...element.inputProperties,
                  hidden: !Obj.dataValues.value,
                },
              };
              return x;
            }
          } else return element;
        });
        return updatedSchema;
      } else if (binding.target) {
        let targetID = binding.target;
        let updatedSchema = formSchema.map((element) => {
          if (element.dataValues.id === targetID) {
            return {
              ...element,
              inputProperties: {
                ...element.inputProperties,
                hidden: !Obj.dataValues.value, //if value=true hidden = false
              },
            };
          } else return element;
        });
        return updatedSchema;
      }
    }
  }
  // }
  return formSchema;
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
