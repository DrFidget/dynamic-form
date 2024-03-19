import { useEffect, useState } from "react";
import IDoptional from "./IDoptional";
import { TLookup, TOptional } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import Modal from "../../../../compoenents/Modal";
import TableLookup from "./lookUpOpt/TableLookup";
import Binding from "./bindingOpt/Binding";
import Button from "../../../../compoenents/Button";
import styles from "./OptionalProperties.module.css";
import TextInput from "../../../../compoenents/TextInput";

interface Props {
  onApply: (obj: TOptional) => void;
  onSkip: () => void;
  OptionalProperties?: TOptional;
}

const OptionalProperties = ({ onApply, OptionalProperties, onSkip }: Props) => {
  const [optionalProps, setOptionalProps] = useState<TOptional>(() => {
    if (OptionalProperties) return OptionalProperties;
    return {};
  });
  const [isLookUp, setISLookup] = useState({
    needed: false,
    added: false,
  });
  const [isBinding, setIsBinding] = useState({
    needed: false,
    added: false,
  });
  useEffect(() => {
    if (OptionalProperties) {
      if (OptionalProperties.lookup) {
        setISLookup({ needed: false, added: true });
      }
      if (OptionalProperties.binding) {
        setIsBinding({ needed: false, added: true });
      }
    }
  }, []);
  return (
    <div>
      <IDoptional
        onChange={(id, value) => {
          Actions.ID.onChange(id, value, optionalProps, setOptionalProps);
        }}
        optIDs={{
          altId: optionalProps?.altId ?? "",
          groupId: optionalProps?.groupId ?? "",
          tag: optionalProps?.tag ?? "",
        }}
      />
      <TextInput
        label="Default"
        onChange={(s) => {
          let x = { ...optionalProps };
          x.default = s;
          if (s === "") delete x.default;
          setOptionalProps(x);
        }}
        value={optionalProps?.default ?? ""}
      />

      <CheckBoxInput
        value={isLookUp.needed || isLookUp.added}
        label="Add Lookup Property"
        onChange={(e) => {
          if (!e && isLookUp.needed && isLookUp.added) {
            Actions.LookUp.resetLookup(optionalProps, setOptionalProps);
            setISLookup({ added: false, needed: false });
            return;
          }
          setISLookup({ ...isLookUp, needed: e });
        }}
      />
      <Modal
        headerText="Look Up"
        isOpen={isLookUp.needed && !isLookUp.added}
        onClose={() => setISLookup({ ...isLookUp, needed: false })}
      >
        <TableLookup
          OnSubmit={(obj: TLookup) => {
            setISLookup({ needed: true, added: true });
            Actions.LookUp.onsubmit(obj, optionalProps, setOptionalProps);
          }}
          LookupProps={{
            col: optionalProps.lookup?.col ?? "",
            row: optionalProps.lookup?.row ?? "",
            IdCol: optionalProps.lookup?.IdCol ?? "MPH",
            source:
              optionalProps.lookup?.source ??
              `[ 
              {"MPH":"",
              "":""}
              ]`,
          }}
        />
      </Modal>

      <CheckBoxInput
        label="Add Binding"
        value={isBinding.needed || isBinding.added}
        onChange={(e) => {
          if (!e && isBinding.needed && isBinding.added) {
            Actions.Binding.resetBinding(optionalProps, setOptionalProps);
            setIsBinding({ added: false, needed: false });
            return;
          }
          setIsBinding({ ...isBinding, needed: e });
        }}
      />
      <Modal
        headerText="Binding"
        isOpen={isBinding.needed && !isBinding.added}
        onClose={() => setIsBinding({ ...isBinding, needed: false })}
      >
        <Binding
          onSubmit={(obj) => {
            setIsBinding({ needed: true, added: true });
            Actions.Binding.onsubmit(obj, optionalProps, setOptionalProps);
          }}
          BindingProps={{
            property: optionalProps.binding?.property ?? undefined,
            targetProperty: optionalProps.binding?.targetProperty ?? undefined,
            target: optionalProps.binding?.target ?? undefined,
            targetArray: optionalProps.binding?.targetArray ?? undefined,
            targetGroup: optionalProps.binding?.targetGroup ?? undefined,
            fun: optionalProps.binding?.fun ?? undefined,
            logicalFunction:
              optionalProps.binding?.logicalFunction ?? undefined,
            mapping: optionalProps.binding?.mapping ?? undefined,
            mathFunction: optionalProps.binding?.mathFunction ?? undefined,
          }}
        />
      </Modal>
      <div className={styles.buttoncontainer}>
        <Button
          color="green"
          onClick={() => {
            onApply(optionalProps);
            console.log("optional->", optionalProps);
          }}
          text="Apply"
        />
        <Button color="#E70127" onClick={() => onSkip()} text="Skip" />
      </div>
    </div>
  );
};

export default OptionalProperties;
