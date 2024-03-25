import React, { useContext, useEffect, useState } from "react";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import RequiredInputs from "./required/RequiredInputs";
import OptionalProperties from "./optionalProperties/OptionalProperties";
import HtmlProperties from "./htmlProperties/HtmlProperties";
import Collapsible from "../../../compoenents/Collapsible";
import { useChangeMode, useActions, useDoneFields } from "./fieldMakerLogic";
import { TList, TNumber } from "../../../types/TypeBasedProps";
import Button from "../../../compoenents/Button";
import SingleFieldContext from "../../../context/singleField/SingleFieldContext";
import styles from "./FieldMaker.module.css";

interface Props {
  styles?: React.CSSProperties;
  ButtonProps?: {
    text: string;
    onClick: (object: TFields) => void;
    color?: string;
  };
  PreBuiltField?: TFields;
  onCancel: () => void;
}

const FieldMaker = ({
  styles: st,
  ButtonProps,
  PreBuiltField,
  onCancel,
}: Props) => {
  const [singleField, setSingleField] = useState<TFields>(() => {
    if (PreBuiltField) return PreBuiltField;
    return {
      id: "",
      fieldName: "",
      fieldType: "",
    };
  });
  const { doneFields, setDone, setNotDone } = useDoneFields(
    PreBuiltField
      ? { req: true, type: true, opt: true, html: true }
      : { req: false, type: false, opt: false, html: false }
  );
  const { inputMode, ChangeMode } = useChangeMode();
  const Actions = useActions();
  const { setField } = useContext<any>(SingleFieldContext);

  useEffect(() => {
    setField(singleField);
  }, [singleField]);

  return (
    <div style={{ ...st, color: "white" }}>
      <h2 className={`${styles.h2}`}>Create a new Field</h2>
      <hr />
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Collapsible
          isOpen={inputMode.required}
          onClick={() => {
            if (!inputMode.required) ChangeMode.required();
          }}
          title="Required Props"
        >
          <RequiredInputs
            onNext={(object) =>
              Actions.requiredFields.Next(
                object,
                singleField,
                setSingleField,
                ChangeMode,
                setDone
              )
            }
            RequiredProperties={{
              id: singleField.id,
              fieldName: singleField.fieldName,
              fieldType: singleField.fieldType,
            }}
          />
        </Collapsible>

        {doneFields.req && (
          <Collapsible
            isOpen={inputMode.typeBased}
            title="TypeBased Props"
            onClick={() => {
              if (!inputMode.typeBased) ChangeMode.typeBased();
            }}
          >
            {inputMode.typeBased &&
              (() => {
                switch (singleField.fieldType) {
                  case "number":
                    let x: TNumber = {};
                    if (doneFields.type) {
                      singleField.numberDecimal
                        ? (x.numberDecimal = singleField.numberDecimal)
                        : false;
                      singleField.numberMin
                        ? (x.numberMin = singleField.numberMin)
                        : null;
                      singleField.numberMax
                        ? (x.numberMax = singleField.numberMax)
                        : null;
                      singleField.validation
                        ? (x.validation = singleField.validation)
                        : (x.validation = { rules: [] });
                    }
                    return (
                      <>
                        <h2>Type Based Properties</h2>
                        <MapTypeToCompoenet.number
                          NumberFieldsSchema={
                            Object.values(x).length > 0 ? x : null
                          }
                          onApplyProperties={(object) =>
                            Actions.typeBased.Number.HandlePropsApply(
                              object,
                              singleField,
                              setSingleField,
                              ChangeMode,
                              setDone
                            )
                          }
                          onSkipProperties={() =>
                            Actions.typeBased.Number.SkipHandle(
                              ChangeMode,
                              setDone
                            )
                          }
                        />
                      </>
                    );
                  case "list":
                  case "radioList":
                    let y: TList = { options: [] as string[] };
                    if (doneFields.req) {
                      singleField.options
                        ? (y.options = singleField.options as string[])
                        : [];
                      singleField.data ? (y.data = singleField.data) : null;
                    }
                    return (
                      <>
                        <h2>Type Based Properties</h2>
                        <MapTypeToCompoenet.list
                          ListFieldsProps={
                            Object.values(y).length > 0 ? y : null
                          }
                          onApply={(object) =>
                            Actions.typeBased.List.handlePropsApply(
                              object,
                              singleField,
                              setSingleField,
                              ChangeMode,
                              setDone
                            )
                          }
                        />
                      </>
                    );
                  case "table":
                    return (
                      <>
                        <MapTypeToCompoenet.table
                          TableOptions={
                            singleField.options
                              ? (singleField.options as TFields[])
                              : []
                          }
                          onNext={(obj) => {
                            Actions.typeBased.table.onNext(
                              obj,
                              singleField,
                              setSingleField,
                              ChangeMode,
                              setDone
                            );
                          }}
                        />
                      </>
                    );
                  default:
                    ChangeMode.HtmlProps();
                    setDone("type");
                    return null;
                }
              })()}
          </Collapsible>
        )}

        {doneFields.type && (
          <Collapsible
            isOpen={inputMode.HtmlProps}
            title="HTML Props"
            onClick={() => {
              if (!inputMode.HtmlProps) ChangeMode.HtmlProps();
            }}
          >
            {inputMode.HtmlProps && (
              <HtmlProperties
                HtmlProps={{
                  visible:
                    singleField.visible !== undefined
                      ? singleField.visible
                      : true,
                  enable:
                    singleField.enable !== undefined
                      ? singleField.enable
                      : true,
                  required:
                    singleField.required !== undefined
                      ? singleField.required
                      : false,
                }}
                onApply={(object) =>
                  Actions.HtmlProps.Apply(
                    object,
                    singleField,
                    setSingleField,
                    ChangeMode,
                    setDone
                  )
                }
                onSkip={() => Actions.HtmlProps.SkipHandle(ChangeMode, setDone)}
              />
            )}
          </Collapsible>
        )}

        {doneFields.html && (
          <Collapsible
            title="Optional Props"
            isOpen={inputMode.optional && !doneFields.opt}
            onClick={() => {
              if (!inputMode.optional) ChangeMode.optional;
              if (doneFields.opt) setNotDone("opt");
            }}
          >
            {inputMode.optional && (
              <OptionalProperties
                onSkip={() => Actions.OptionalProps.SkipHandle(setDone)}
                OptionalProperties={{
                  altId: singleField.altId ?? "",
                  groupId: singleField.groupId ?? "",
                  lookup: singleField.lookup ?? undefined,
                  binding: singleField.binding ?? undefined,
                  default: singleField.default ?? "",
                  tag: singleField.tag ?? "",
                }}
                onApply={(obj) => {
                  // console.log("fieldmaker->", obj);
                  Actions.OptionalProps.Apply(
                    obj,
                    singleField,
                    setSingleField,
                    setDone
                  );
                }}
              />
            )}
          </Collapsible>
        )}
      </div>
      {/* {doneFields.html && doneFields.req && doneFields.type && ( */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          // disabled={doneFields.type ? false : true}
          styles={{ marginBlock: "20px", marginInline: "20px" }}
          color={"#E70127"}
          text={"Cancel"}
          onClick={onCancel}
        />
        <Button
          disabled={doneFields.type ? false : true}
          styles={{ marginBlock: "20px", marginInline: "20px" }}
          color={ButtonProps?.color || "green"}
          text={ButtonProps?.text || "Create Field"}
          onClick={() => {
            ButtonProps?.onClick(singleField);
          }}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default FieldMaker;
