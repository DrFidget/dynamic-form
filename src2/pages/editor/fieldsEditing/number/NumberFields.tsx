import React, { useState } from "react";
import { TypeBasedOptions } from "../../TypeBasedOptions";
import { TNumber, TValidation } from "../../../../types/TypeBasedProps";
import { inputsInterface } from "../../../../compoenents/inputsInterface";
import Validation from "./Validation";
import Button from "../../../../compoenents/Button";
import styles from "./Number.module.css";
import Modal from "../../../../compoenents/Modal";

interface Props {
  NumberFieldsSchema?: TNumber;
}

const NumberFields = ({ NumberFieldsSchema }: Props) => {
  const [numberFields, setNumberFields] = useState<TNumber>({
    validation: { rules: [] },
  });
  const [needValidation, setNeedvalidation] = useState(() => {
    if (NumberFieldsSchema && NumberFieldsSchema.validation) return true;
    return false;
  });
  const options = TypeBasedOptions.number;

  const HandleChange = (val: any, key: string) => {
    setNumberFields({ ...numberFields, [key]: val });
  };

  const ValidateProps = () => {
    if (numberFields.numberMin && numberFields.numberMax) {
      if (numberFields.numberMin > numberFields.numberMax) {
        alert("Minimum Value can't be greater than Maximum Value");
      }
    }
    if (numberFields.validation) {
      if (numberFields.validation.rules.length < 1) {
        let x = { ...numberFields };
        delete x.validation;
        setNumberFields(x);
        // delete numberFields.validation;
      }
    }
  };
  const HandleApplyRule = (object: any) => {
    setNeedvalidation(false);
    let x = { ...numberFields };
    if (x.validation) {
      x.validation.rules.push(object);
    }
    setNumberFields(x);
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Numarical Properties</h2>
        {Object.entries(options).map(([key, value]) => {
          const X = inputsInterface[value.type];
          if (X) {
            return (
              <X
                key={key}
                value={numberFields[key]}
                label={value.label}
                onChange={(val: any) => {
                  HandleChange(val, key);
                }}
              />
            );
          }
        })}

        <Button
          text="Add Rule"
          color="green"
          onClick={() => setNeedvalidation(!needValidation)}
        />

        <Modal
          children={<Validation handleApplyRule={HandleApplyRule} />}
          isOpen={needValidation}
          headerText="Validation"
          onClose={() => {
            setNeedvalidation(false);
          }}
        />

        <div className={styles.buttoncontainer}>
          <Button
            color="green"
            onClick={() => {
              ValidateProps();
            }}
            text="Apply"
          />
          <Button color="red" onClick={() => {}} text="Skip" />
        </div>
      </div>
    </>
  );
};

export default NumberFields;
