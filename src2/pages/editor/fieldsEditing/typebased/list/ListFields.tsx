import React, { useEffect, useState } from "react";
import { TList } from "../../../../../types/TypeBasedProps";
import OptionsInput from "./OptionsInput";
import DataInput from "./DataInput";
import CheckBoxInput from "../../../../../compoenents/CheckBoxinput";
import styles from "./ListFields.module.css";
import Button from "../../../../../compoenents/Button";

interface Props {
  ListFieldsProps?: TList;
  onApply: (fields: TList) => void;
}
const ListFields = ({ ListFieldsProps, onApply }: Props) => {
  const [ListFields, setListFields] = useState<TList>(() => {
    if (ListFieldsProps) return ListFieldsProps;
    return {
      options: [],
    };
  });
  const [enterData, setEnterData] = useState(() => {
    if (ListFieldsProps?.data) return true;
    return false;
  });

  const Actions = {
    Options: {
      AppendOptions: (e: string) => {
        if (ListFields.options.includes(e)) {
          alert("value already added");
          return;
        }
        setListFields({ ...ListFields, options: [...ListFields.options, e] });
      },
      RemoveOption: (i: number) => {
        let x = { ...ListFields };
        let newOptions = x.options.filter((_, j) => i !== j) as string[];
        x.options = [...newOptions];
        if (x.data) {
          let newdata = x.data?.filter((_, j) => i !== j) as string[];
          x.data = [...newdata];
        }
        setListFields({ ...x });
      },
    },
    Data: {
      DataOnChange: (e: string, i: number) => {
        let x = ListFields.data as string[];
        x[i] = e;
        setListFields({ ...ListFields, data: x });
      },
    },

    Button: {
      ValidateProps: () => {
        if (
          ListFields.options.length === 0 ||
          ListFields.options.includes("")
        ) {
          alert("please fill out Options !");
          return;
        }
        if (ListFields.data?.includes("")) {
          alert("please fill out all the Mapping fields !");
          return;
        }
        onApply(ListFields);
      },
    },
  };

  return (
    <div>
      <OptionsInput
        Options={ListFields.options}
        AppendOptions={Actions.Options.AppendOptions}
        RemoveOption={Actions.Options.RemoveOption}
      />

      <CheckBoxInput
        onChange={(e: boolean) => {
          if (e) {
            let x = new Array(ListFields.options.length).fill("");
            setListFields({ ...ListFields, data: x });
          } else {
            let x = { ...ListFields };
            delete x.data;
            setListFields(x);
          }
          setEnterData(e);
        }}
        label="Map values to Options"
        value={enterData}
      />
      {enterData && (
        <DataInput
          options={ListFields.options}
          data={ListFields.data || []}
          onChange={Actions.Data.DataOnChange}
        />
      )}

      <div className={styles.buttoncontainer}>
        <Button
          color="green"
          onClick={Actions.Button.ValidateProps}
          text="Apply"
        />
        {/* <Button color="red" onClick={() => {}} text="Skip" /> */}
      </div>
    </div>
  );
};

export default ListFields;
