import React, { useState } from "react";
import CheckBoxInput from "../../../../../compoenents/CheckBoxinput";
import Modal from "../../../../../compoenents/Modal";
import TableLookup from "./TableLookup";
import { TLookup } from "../../../../../types/TypeBasedProps";

interface Props {
  LookupProps?: TLookup;
  OnSubmit: (obj: TLookup) => void;
}
const LookUp = ({ LookupProps, OnSubmit }: Props) => {
  const [addLookuptable, setAddLookuptable] = useState(false);
  return (
    <div>
      <CheckBoxInput
        value={addLookuptable}
        label="Add Lookup Property"
        onChange={(e) => setAddLookuptable(e)}
      />

      <Modal
        headerText="Look Up"
        isOpen={addLookuptable}
        onClose={() => setAddLookuptable(false)}
      >
        {LookupProps ? (
          <TableLookup LookupProps={LookupProps} OnSubmit={OnSubmit} />
        ) : (
          <TableLookup
            OnSubmit={OnSubmit}
            LookupProps={{
              col: "abc",
              row: "xyz",
              source: [
                { MPH: "10", "10": "367", "15": "440" },
                { MPH: "15", "10": "550", "15": "660" },
              ],
            }}
          />
        )}
        {/* <TableLookup /> */}
      </Modal>
    </div>
  );
};

export default LookUp;
