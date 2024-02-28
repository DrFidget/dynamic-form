import React, { useState } from "react";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import RequiredInputs from "./required/RequiredInputs";
import OptionalProperties from "./optionalProperties/OptionalProperties";
import HtmlProperties from "./htmlProperties/HtmlProperties";
import Collapsible from "../../../compoenents/Collapsible";
import { useChangeMode, useActions, useDoneFields } from "./fieldMakerLogic";
import { TList, TNumber } from "../../../types/TypeBasedProps";

const FieldMaker = () => {
  const [singleField, setSingleField] = useState<TFields>({
    id: "",
    fieldName: "",
    fieldType: "",
  });
  const { doneFields, setDone } = useDoneFields();
  const { inputMode, ChangeMode } = useChangeMode();
  const Actions = useActions();

  return (
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
                      : (singleField.validation = { rules: [] });
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
                  let y: TList = { options: [] };
                  if (doneFields.req) {
                    singleField.options
                      ? (y.options = singleField.options)
                      : [];
                    singleField.data ? (y.data = singleField.data) : null;
                  }
                  return (
                    <>
                      <h2>Type Based Properties</h2>
                      <MapTypeToCompoenet.list
                        ListFieldsProps={Object.values(y).length > 0 ? y : null}
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
          isOpen={inputMode.optional}
          onClick={() => {
            if (!inputMode.optional) ChangeMode.optional;
          }}
        >
          {inputMode.optional && <OptionalProperties />}
        </Collapsible>
      )}
    </div>
  );
};

export default FieldMaker;
