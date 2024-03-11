import { TBinding, TLookup, TOptional } from "../../../../types/TypeBasedProps";
import Binding from "./bindingOpt/Binding";

export const Actions = {
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
      x.lookup = object;
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
