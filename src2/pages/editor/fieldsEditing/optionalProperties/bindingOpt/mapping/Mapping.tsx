import React, { useState } from "react";
import Button from "../../../../../../compoenents/Button";
import Modal from "../../../../../../compoenents/Modal";
import { TBinding, TMapping } from "../../../../../../types/TypeBasedProps";
import TargetFields from "../TargetFields";
import MappingProperties from "./MappingProperties";
import swal from "sweetalert";

interface Props {
  bindingProps: TBinding;
  onSubmit: (mappingProps: TMapping) => void;
  mapProps?: TMapping;
}

const Mapping = ({ bindingProps, onSubmit, mapProps }: Props) => {
  const [addMapping, setAddMapping] = useState(false);
  const [mappingProps, setMappingProps] = useState<TMapping>(() => {
    if (mapProps) return mapProps;
    else return {};
  });

  const Actions = {
    TargetFields: {
      onChange: (val: string | string[], id: string) => {
        if (id === "targetArray") {
          setMappingProps({ ...mappingProps, [id]: val as string[] });
          let x = { ...mappingProps };
          if (val == "") {
            delete x.targetArray;
            setMappingProps({ ...x });
          }
        } else if (id === "target" || id === "targetGroup") {
          setMappingProps({ ...mappingProps, [id]: val as string });
          if (val == "") {
            let x = { ...mappingProps };
            id === "target" ? delete x.target : delete x.targetGroup;
            setMappingProps({ ...x });
          }
        }
      },
      removeIDFromArray: (index: number) => {
        let x = { ...mappingProps };
        if (x.targetArray) {
          let arr = JSON.parse(JSON.stringify(x.targetArray)) as string[];
          arr.splice(index, 1);
          if (arr.length == 0) {
            delete x.targetArray;
            setMappingProps({ ...x });
            return;
          }
          setMappingProps({ ...mappingProps, targetArray: arr });
        }
      },
    },
    MappingProperties: {
      appendOptions: (s: string) => {
        let x = mappingProps.options || ([] as string[]);
        if (x.includes(s)) {
          swal("value already Added");
          return;
        }
        x.push(s);
        setMappingProps({ ...mappingProps, options: x });
      },
      addOption: (s: string) => {
        let x = mappingProps?.options || [""];
        x[0] = s;
        if (x.length === 0) {
          let xx = { ...mappingProps };
          delete xx.options;
          setMappingProps({ ...xx });
          return;
        }
        setMappingProps({ ...mappingProps, options: [x[0]] });
      },

      ResetOptions: () => {
        let x = { ...mappingProps };
        delete x.options;
        setMappingProps({ ...x });
      },
      changeMapTo: (s: string) => {
        setMappingProps({ ...mappingProps, mapTo: s });
        if (s === "") {
          let x = { ...mappingProps };
          delete x.mapTo;
          setMappingProps({ ...x });
        }
      },
      ChangeformatFuntion: (s: string) => {
        setMappingProps({ ...mappingProps, formatFunction: s });
        if (s === "") {
          let x = { ...mappingProps };
          delete x.formatFunction;
          setMappingProps({ ...x });
        }
      },
    },
    SubmitHandler: {
      Validate: () => {
        switch (bindingProps.targetProperty) {
          case "value": {
            if (
              mappingProps.options &&
              mappingProps.mapTo &&
              !mappingProps.target &&
              !mappingProps.targetArray &&
              !mappingProps.targetGroup
            ) {
              swal("Please select a target Field");
              return false;
            }
            if (!mappingProps.formatFunction) {
              swal("Please Provide Mapping Fields Or Cancel The Mapping.");
              return false;
            }
            return true;
          }
          case "enable":
          case "visible": {
            if (!mappingProps.options || !mappingProps?.mapTo) {
              swal("Please provide options and Map To fields.");
              return false;
            } else if (
              !mappingProps.target &&
              !mappingProps.targetArray &&
              !mappingProps.targetGroup
            ) {
              swal("Please provide Target field or Target Array/Target Group");
              return false;
            }
            return true;
          }
        }
      },

      onsubmit: () => {
        if (Actions.SubmitHandler.Validate()) {
          console.log("submit");
          onSubmit(mappingProps);
          setAddMapping(false);
          setMappingProps({});
        }
      },
    },
  };

  return (
    <>
      <h3>Mapping</h3>
      <Button
        text="Add Mapping"
        color="blue"
        disabled={
          bindingProps.targetProperty === undefined
            ? true
            : bindingProps.targetProperty === ""
            ? true
            : false
        }
        onClick={() => {
          setAddMapping(true);
        }}
      />
      <Modal
        headerText="Mapping"
        isOpen={addMapping}
        onClose={() => {
          setAddMapping(false);
        }}
      >
        <div style={{ display: "flex", gap: "35px" }}>
          <div style={{ width: "50%" }}>
            <MappingProperties
              optionsChange={Actions.MappingProperties.appendOptions}
              resetOptions={Actions.MappingProperties.ResetOptions}
              addOption={Actions.MappingProperties.addOption}
              changeMapTo={Actions.MappingProperties.changeMapTo}
              ChangeformatFuntion={
                Actions.MappingProperties.ChangeformatFuntion
              }
              bindingProps={bindingProps}
              mappingProps={{
                options: mappingProps.options ?? [""],
                mapTo: mappingProps.mapTo ?? "",
                formatFunction: mappingProps.formatFunction ?? "",
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <TargetFields
              TFValues={{
                target: mappingProps.target ?? "",
                targetGroup: mappingProps.targetGroup ?? "",
                targetArray: mappingProps.targetArray ?? [],
              }}
              onChange={Actions.TargetFields.onChange}
              RemoveOption={Actions.TargetFields.removeIDFromArray}
            />
          </div>
        </div>
        <hr style={{ marginBlock: "20px" }} />

        <Button
          onClick={Actions.SubmitHandler.onsubmit}
          text="Add Mapping"
          color="green"
        />
      </Modal>
    </>
  );
};

export default Mapping;
