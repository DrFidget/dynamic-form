import React, { useState } from "react";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import RequiredInputs from "./required/RequiredInputs";
import OptionalProperties from "./optionalProperties/OptionalProperties";
import HtmlProperties from "./htmlProperties/HtmlProperties";
import Collapsible from "../../../compoenents/Collapsible";
import { useChangeMode, useActions, useDoneFields } from "./fieldMakerLogic";

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
        title="Required Fields"
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
          title="TypeBased"
          onClick={() => {
            if (!inputMode.typeBased) ChangeMode.typeBased();
          }}
        >
          {inputMode.typeBased &&
            (() => {
              switch (singleField.fieldType) {
                case "number":
                  return (
                    <>
                      <h2>Type Based Properties</h2>
                      <MapTypeToCompoenet.number
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
                  return (
                    <>
                      <h2>Type Based Properties</h2>
                      <MapTypeToCompoenet.list
                        ListFieldsProps={{
                          options: singleField.options
                            ? singleField.options
                            : [],
                          data: singleField.data ? singleField.data : [],
                        }}
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
          title="Optional"
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
