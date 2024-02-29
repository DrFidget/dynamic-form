import React from "react";
import TextInput from "../../../../compoenents/TextInput";

interface Props {
  optIDs: {
    altId: string;
    groupId: String;
    tag: string;
  };
  onChange: (id: string, value: string) => void;
}

const optID = [
  { id: "altId", label: "Alternative Id" },
  { id: "groupId", label: "Group Id" },
  { id: "tag", label: "Tag" },
];

const IDoptional = ({ optIDs, onChange }: Props) => {
  return (
    <div>
      {optID.map((e, k) => (
        <TextInput
          key={k}
          onChange={(s) => {
            onChange(e.id, s);
          }}
          label={e.label}
          value={optIDs[e.id] || ""}
        />
      ))}
    </div>
  );
};

export default IDoptional;
