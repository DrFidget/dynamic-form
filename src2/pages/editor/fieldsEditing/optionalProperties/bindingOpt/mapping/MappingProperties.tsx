import { useContext } from "react";
import SingleFieldContext from "../../../../../../context/singleField/SingleFieldContext";
import { TSingleField } from "../../../../../../types/contextTypes";
import TextInput from "../../../../../../compoenents/TextInput";
import { TBinding } from "../../../../../../types/TypeBasedProps";
import DropdownInput from "../../../../../../compoenents/DropdownList";
import Button from "../../../../../../compoenents/Button";
import RadioInput from "../../../../../../compoenents/RadioInput";

interface Props {
  mappingProps?: {
    formatFunction?: string;
    options: string[];
    mapTo?: string;
  };
  optionsChange: (s: string) => void;
  resetOptions: () => void;
  addOption: (s: string) => void;
  bindingProps: TBinding;
  changeMapTo: (s: string) => void;
  ChangeformatFuntion: (s: string) => void;
}
const MappingProperties = ({
  mappingProps,
  bindingProps,
  resetOptions,
  optionsChange,
  addOption,
  changeMapTo,
  ChangeformatFuntion,
}: Props) => {
  const { field } = useContext<TSingleField>(SingleFieldContext);

  return (
    <div style={{}}>
      <h3>Mapping Props</h3>
      {field?.fieldType === "list" || field?.fieldType === "radioList" ? (
        <>
          <DropdownInput
            label="select Options"
            values={(field.options as string[]) || [""]}
            options={(field.options as string[]) || [""]}
            selectedValue=""
            onChange={(s) => optionsChange(s)}
          />
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <TextInput
              styles={{ width: "100%" }}
              label="Options / Cases :"
              htmlprops={{ disabled: true }}
              onChange={() => {}}
              value={JSON.stringify(mappingProps?.options)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                styles={{ height: "40px" }}
                text="reset"
                color="red"
                onClick={() => {
                  resetOptions();
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <TextInput
            onChange={(s) => {
              addOption(s);
            }}
            label="Enter (Option / Case)"
            value={mappingProps?.options ? mappingProps.options[0] : ""}
            // value={""}
          />
        </>
      )}

      {bindingProps.targetProperty !== "value" ? (
        <div>
          <RadioInput
            label="Map To"
            selectedValue={mappingProps?.mapTo || ""}
            options={["TRUE", "FALSE"]}
            values={["true", "false"]}
            onChange={(s) => changeMapTo(s)}
          />
        </div>
      ) : (
        <div>
          <TextInput
            label="Map To"
            value={mappingProps?.mapTo || ""}
            onChange={(s) => changeMapTo(s)}
          />

          <TextInput
            onChange={(s) => ChangeformatFuntion(s)}
            label="Format Function"
            value={mappingProps?.formatFunction || ""}
          />
        </div>
      )}
    </div>
  );
};

export default MappingProperties;
