import React, { useState } from "react";
import { THtmlProps } from "../../../../types/TypeBasedProps";
import CheckBoxInput from "../../../../compoenents/CheckBoxinput";
import styles from "./HtmlProperties.module.css";
import Button from "../../../../compoenents/Button";
const propshtml = [
  { key: "visible", title: "Visible" },
  { key: "enable", title: "Enable" },
  { key: "required", title: "Required" },
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
      required: false,
    };
  });

  const handleChange = (v: boolean, k: string) => {
    setProps({ ...props, [k]: v });
  };
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
          value={props[e.key]}
        />
      ))}
      <div className={styles.buttoncontainer}>
        <Button
          color="green"
          onClick={() => {
            onApply(props);
          }}
          text="Apply"
        />
        <Button color="red" onClick={onSkip} text="Skip" />
      </div>
    </div>
  );
};

export default HtmlProperties;
