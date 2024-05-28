import { TBinding, TLookup, TOptional, TValidation } from "../../../../types/TypeBasedProps";
import Binding from "./bindingOpt/Binding";

export const Actions = {

  Validation:{
    handleApplyRule:(object:TValidation,setNeedValidation:any,optionalState:TOptional,setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>)=>{
      setNeedValidation(false);
      let x={...optionalState};
      if(x.validation){
        x.validation.rules.push(object);
      }
      else
      x.validation={rules:[object]}
      setOptionalProps({...x});
    },
    EditRule:(index:number,setValidationEdit:any,optionalState:TOptional)=>{
      setValidationEdit({
        isOpen: true,
        row: index,
        data: optionalState.validation?.rules[index],
      })
    },
    onDelete: (index: number,optionalState:TOptional,setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>) => {
      let x = { ...optionalState };
      x.validation?.rules.splice(index, 1);
      if(x.validation?.rules.length===0){
        delete x.validation;
      }
      setOptionalProps(x);
    },
    onEditSave:(newRule:TValidation,optionalState:TOptional,setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>,validationEdit:any,setValidationEdit:any)=>{
      let x={...optionalState};
      if (x.validation) x.validation.rules[validationEdit.row || 0] = newRule;
      setOptionalProps(x);

      let xx: any = { isOpen: false };
      setValidationEdit(xx);
    }
  },
  ID: {
    onChange: (
      id: "altId" | "groupId" | "tag",
      value: string,
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      x[id] = value;
      if (value === "") delete x[id];
      setOptionalProps(x);
    },
  },
  LookUp: {
    onsubmit: (
      object: TLookup,
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      // console.log(object);
      x.lookup = object;
      // console.log(x, typeof x.lookup.source);
      setOptionalProps(x);
    },
    resetLookup: (
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      if (x.lookup) {
        delete x.lookup;
      }
      setOptionalProps({ ...x });
    },
  },
  Binding: {
    onsubmit: (
      object: TBinding,
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      x.binding = object;
      setOptionalProps({ ...x });
    },
    resetBinding: (
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      if (x.binding) {
        delete x.binding;
      }
      setOptionalProps({ ...x });
    },
  },
};
