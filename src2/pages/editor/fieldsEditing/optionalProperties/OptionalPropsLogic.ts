import { TLookup, TOptional } from "../../../../types/TypeBasedProps";

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
      x.lookUp = object;
      setOptionalProps(x);
    },
    resetLookup: (
      optionalProps: TOptional,
      setOptionalProps: React.Dispatch<React.SetStateAction<TOptional>>
    ) => {
      let x = { ...optionalProps };
      x.lookUp ?? delete x.lookUp;
      setOptionalProps({ ...x });
    },
  },
};
