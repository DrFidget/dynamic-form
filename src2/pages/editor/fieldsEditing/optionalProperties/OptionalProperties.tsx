import { useState } from "react";
import IDoptional from "./IDoptional";
import { TLookup, TOptional } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import Modal from "../../../../compoenents/Modal";
import TableLookup from "./lookUpOpt/TableLookup";
import Binding from "./bindingOpt/Binding";

const OptionalProperties = () => {
  const [optionalProps, setOptionalProps] = useState<TOptional>({});
  const [isLookUp, setISLookup] = useState({
    needed: false,
    added: false,
  });
  const [isMapping, setIsMapping] = useState({
    needed: false,
    added: false,
  });
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
            col: optionalProps.lookUp?.col ?? "",
            row: optionalProps.lookUp?.row ?? "",
            IdCol: optionalProps.lookUp?.IdCol ?? "MPH",
            source:
              optionalProps.lookUp?.source ??
              `[ 
              {"MPH":"",
              "":""}
              ]`,
          }}
        />
      </Modal>

      <CheckBoxInput
        label="Add Binding"
        value={isMapping.needed || isMapping.added}
        onChange={(e) => {
          if (!e && isMapping.needed && isMapping.added) {
            Actions.Binding.resetBinding(optionalProps, setOptionalProps);
            setIsMapping({ added: false, needed: false });
            return;
          }
          setIsMapping({ ...isMapping, needed: e });
        }}
      />
      <Modal
        headerText="Binding"
        isOpen={isMapping.needed && !isMapping.added}
        onClose={() => setIsMapping({ ...isMapping, needed: false })}
      >
        <Binding
          onSubmit={(obj) => {
            setIsMapping({ needed: true, added: true });
            Actions.Binding.onsubmit(obj, optionalProps, setOptionalProps);
          }}
          BindingProps={{
            property: optionalProps.binding?.property ?? undefined,
            targetProperty: optionalProps.binding?.targetProperty ?? undefined,
            target: optionalProps.binding?.target ?? "undefined",
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
    </div>
  );
};

export default OptionalProperties;
