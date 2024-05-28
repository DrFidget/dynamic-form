import React, { useState } from "react";
import { THtmlProps } from "../../../../types/TypeBasedProps";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import styles from "./HtmlProperties.module.css";
import Button from "../../../../compoenents/Button";
import RadioInput from "../../../../compoenents/RadioInput";
const propshtml = [
  { key: "visible", title: "Visible" },
  { key: "enable", title: "Enable" },
  { key: "required", title: "Required" },
  // { key: "groupVisibility", title: "Group Visibility" },
];

interface Props {
  onSkip: () => void;
  onApply: (obj: THtmlProps) => void;
  HtmlProps?: THtmlProps;
}
const HtmlProperties = ({ onSkip, onApply, HtmlProps }: Props) => {
  const [props, setProps] = useState<THtmlProps>(() => {
    if (HtmlProps) return HtmlProps;
    return {
      visible: true,
      enable: true,
      required: false
    };
  });

  const handleChange = (v: boolean, k: string) => {
    setProps({ ...props, [k]: v });
  };
  const HandleGroupVisibilityChange=(v:string)=>{
    if(v==="true"){
      setProps({ ...props, groupVisibility: true });
    }
    else if(v==="false"){
      setProps({ ...props, groupVisibility: false });
    }
    else if(v===""){
      const newProps = { ...props };
      delete newProps.groupVisibility;
      setProps(newProps);
    }
  }
  return (
    <div>
      <h2>HTML Properties</h2>
      {propshtml.map((e, k) => (
        <CheckBoxInput
          key={k}
          onChange={(s: boolean) => {
            handleChange(s, e.key);
          }}
          label={e.title}
          value={props[(e.key as "visible") || "enable" || "required"]}
        />
      ))}
      <RadioInput label="Group Visibility" onChange={(val:string)=>{
        console.log(val)
        HandleGroupVisibilityChange(val);
      }} options={["True","False","Skip"]} values={["true","false",""]} 
      selectedValue={
        props.groupVisibility === true
          ? "true"
          : props.groupVisibility === false
          ? "false"
          : ""
      } />


      <div className={styles.buttoncontainer}>
        <Button
          color="green"
          onClick={() => {
            onApply(props);
          }}
          text="Apply"
        />
        <Button color="#E70127" onClick={onSkip} text="Skip" />
      </div>
    </div>
  );
};

export default HtmlProperties;
