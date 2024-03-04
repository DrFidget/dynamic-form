import React, { useState } from "react";
import CheckBoxInput from "../../../../../compoenents/CheckBoxinput";
import Modal from "../../../../../compoenents/Modal";
import TableLookup from "./TableLookup";
import { TLookup } from "../../../../../types/TypeBasedProps";

interface Props {
  LookupProps?: TLookup;
  OnSubmit: (obj: TLookup) => void;
  onReset: () => void;
}
const LookUp = ({ LookupProps, OnSubmit, onReset }: Props) => {
  const [addLookuptable, setAddLookuptable] = useState(false);

  const handletableSubmit = (obj: TLookup) => {
    setAddLookuptable(false);
    OnSubmit(obj);
  };
  return (
    <div>
      <CheckBoxInput
        value={addLookuptable}
        label="Add Lookup Property"
        onChange={(e) => {
          setAddLookuptable(e);
        }}
      />

      <Modal
        headerText="Look Up"
        isOpen={addLookuptable}
        onClose={() => setAddLookuptable(false)}
      >
        {LookupProps ? (
          <TableLookup LookupProps={LookupProps} OnSubmit={OnSubmit} />
        ) : (
          <TableLookup OnSubmit={handletableSubmit} />
        )}
        {/* <TableLookup /> */}
      </Modal>
    </div>
  );
};

export default LookUp;

const obj = {
  row: "abc",
  col: "xyz",
  source: `[
    {"MPH": "10",
    "44": "367",
    "55": "440",
    "66": "580"},
    {"MPH": "15",
    "44": "550",
    "55": "660",
    "66": "770"},
    {"MPH": "20",
    "44": "123",
    "55": "465",
    "66": "789"}
    ]`,
};
