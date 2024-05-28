import { useContext, useEffect, useState } from "react";
import IDoptional from "./IDoptional";
import { TLookup, TOptional, TValidation } from "../../../../types/TypeBasedProps";
import { Actions } from "./OptionalPropsLogic";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import Modal from "../../../../compoenents/Modal";
import TableLookup from "./lookUpOpt/TableLookup";
import Binding from "./bindingOpt/Binding";
import Button from "../../../../compoenents/Button";
import styles from "./OptionalProperties.module.css";
import TextInput from "../../../../compoenents/TextInput";
import ValidationNumber from "../typebased/number/Validation";
import { TSingleField } from "../../../../types/contextTypes";
import SingleFieldContext from "../../../../context/singleField/SingleFieldContext";

interface EditMode {
  isOpen: boolean;
  data?: TValidation;
  row?: number;
}
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

  const [needValidation,setNeedvalidation]=useState(()=>false);
  const [validationEdit, setValidationEdit] = useState<EditMode>({
    isOpen: false,
  });
  const {field}=useContext<TSingleField>(SingleFieldContext);
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
          if (!e && isLookUp.added) {
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
          if (!e && isBinding.added) {
            // console.log("clicking");
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
          {
            field?.fieldType!="number" && <>
            <Button onClick={()=>setNeedvalidation(true)} text="Add Validation Rule" color="green" />
        { optionalProps.validation&&optionalProps.validation.rules.length>0 &&
          <table>
            <thead>
                  <tr>
                    <th>Rules</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {optionalProps.validation.rules.map((e, k) => (
                    <tr key={k}>
                      <td>Rule {k + 1} Added </td>
                      <td>
                        <Button
                          color="#007BFF"
                          text="edit"
                          onClick={() => {
                            Actions.Validation.EditRule(k,setValidationEdit,optionalProps);
                          }}
                          type="button"
                        />
                      </td>
                      <td>
                        <Button
                          color="#E70127"
                          text="delete"
                          onClick={() => {
                           Actions.Validation.onDelete(k,optionalProps,setOptionalProps);
                          }}
                          type="button"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
          </table>
        }
        <Modal    
        isOpen={needValidation}
            headerText="Validation"
            onClose={() => {
              setNeedvalidation(false);
            }}>
              <ValidationNumber handleApplyRule={(object:TValidation)=>{
                Actions.Validation.handleApplyRule(object,setNeedvalidation,optionalProps,setOptionalProps);
              }}/>
        </Modal>
        <Modal
            children={
              <ValidationNumber
                EditModeState={validationEdit.data}
                handleApplyRule={(object)=>{
                  Actions.Validation.onEditSave(object,optionalProps,setOptionalProps,validationEdit,setValidationEdit);
                }}
                ButtonText="Confirm"
              />
            }
            isOpen={validationEdit.isOpen}
            headerText="Edit Validation Rule"
            onClose={() => {
              let x: EditMode = { isOpen: false };
              setValidationEdit(x);
            }}
          />
  
            </>
          }
         
      
      <div className={styles.buttoncontainer}>
        <Button
          color="green"
          onClick={() => {
            // console.log("optional->", optionalProps);
            let x: TOptional = JSON.parse(JSON.stringify(optionalProps));
            onApply(x);
            console.log("xyz", x);
          }}
          text="Apply"
        />
        <Button color="#E70127" onClick={() => onSkip()} text="Skip" />
      </div>
      
    </div>
  );
};

export default OptionalProperties;
