import React from "react";
import TextInput from "../../../../compoenents/TextInput";

interface Props {
  optIDs: {
    altId: string;
    groupId: string;
    tag: string;
  };
  onChange: (id: "altId" | "groupId" | "tag", value: string) => void;
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
            onChange(e.id as "altId" | "groupId" | "tag", s);
          }}
          label={e.label}
          value={optIDs[e.id as "altId" | "groupId" | "tag"]}
        />
      ))}
    </div>
  );
};

export default IDoptional;
