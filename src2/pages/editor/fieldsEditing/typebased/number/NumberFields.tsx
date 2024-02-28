import React, { useState } from "react";
import { TypeBasedOptions } from "../../TypeBasedOptions";
import { TNumber, TValidation } from "../../../../../types/TypeBasedProps";
import { inputsInterface } from "../../../../../compoenents/inputsInterface";
import Validation from "./Validation";
import Button from "../../../../../compoenents/Button";
import styles from "./Number.module.css";
import Modal from "../../../../../compoenents/Modal";

interface Props {
  NumberFieldsSchema?: TNumber | null;
  onApplyProperties: (object: TNumber) => void;
  onSkipProperties: () => void;
}

interface EditMode {
  isOpen: boolean;
  data?: TValidation;
  row?: number;
}

const NumberFields = ({
  NumberFieldsSchema,
  onApplyProperties,
  onSkipProperties,
}: Props) => {
  const [numberFields, setNumberFields] = useState<TNumber>(() => {
    if (NumberFieldsSchema) return NumberFieldsSchema;
    return {
      validation: { rules: [] },
    };
  });
  const [needValidation, setNeedvalidation] = useState(() => {
    return false;
  });
  const [validationEdit, setValidationEdit] = useState<EditMode>({
    isOpen: false,
  });

  const options = TypeBasedOptions.number;

  const HandleChange = (val: any, key: string) => {
    setNumberFields({ ...numberFields, [key]: val });
  };

  const ValidateProps = () => {
    if (numberFields.numberMin && numberFields.numberMax) {
      if (numberFields.numberMin > numberFields.numberMax) {
        alert("Minimum Value can't be greater than Maximum Value");
        return;
      }
    }
    if (numberFields.validation) {
      if (numberFields.validation.rules.length < 1) {
        let x = { ...numberFields };
        delete x.validation;
        setNumberFields(x);
      }
    }
    onApplyProperties(numberFields);
  };
  const HandleApplyRule = (object: TValidation) => {
    setNeedvalidation(false);
    let x = { ...numberFields };
    if (x.validation) {
      x.validation.rules.push(object);
    }
    setNumberFields(x);
  };

  const tableActions = {
    onEdit: (index: number) => {
      setValidationEdit({
        isOpen: true,
        row: index,
        data: numberFields.validation?.rules[index],
      });
    },
    onEditSave: (newRule: TValidation) => {
      let x = { ...numberFields };
      if (x.validation) x.validation.rules[validationEdit.row || 0] = newRule;
      setNumberFields(x);

      let xx: EditMode = { isOpen: false };
      setValidationEdit(xx);
    },

    onDelete: (index: number) => {
      let x = { ...numberFields };
      x.validation?.rules.splice(index, 1);
      setNumberFields(x);
    },
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
        {numberFields.validation &&
          numberFields.validation.rules.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Rules</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {numberFields.validation.rules.map((e, k) => (
                  <tr key={k}>
                    <td>Rule {k + 1} Added </td>
                    <td>
                      <Button
                        color="blue"
                        text="edit"
                        onClick={() => {
                          tableActions.onEdit(k);
                        }}
                        type="button"
                      />
                    </td>
                    <td>
                      <Button
                        color="red"
                        text="delete"
                        onClick={() => {
                          tableActions.onDelete(k);
                        }}
                        type="button"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        <Modal
          children={<Validation handleApplyRule={HandleApplyRule} />}
          isOpen={needValidation}
          headerText="Validation"
          onClose={() => {
            setNeedvalidation(false);
          }}
        />
        <Modal
          children={
            <Validation
              EditModeState={validationEdit.data}
              handleApplyRule={tableActions.onEditSave}
              ButtonText="Confirm"
            />
          }
          isOpen={validationEdit.isOpen}
          headerText="Edit Validation Rule"
          onClose={() => {
            let x: EditMode = { isOpen: false };
            setValidationEdit(x);
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
          <Button color="red" onClick={onSkipProperties} text="Skip" />
        </div>
      </div>
    </>
  );
};

export default NumberFields;
