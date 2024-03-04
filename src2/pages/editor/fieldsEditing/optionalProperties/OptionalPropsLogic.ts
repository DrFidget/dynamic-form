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
    onsubmit: (object: any) => {
      // console.log(object);
      let table = JSON.parse(object.source);
      console.log(table);
    },
  },
};
