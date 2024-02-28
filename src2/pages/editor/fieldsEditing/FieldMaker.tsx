import React, { useEffect, useState } from "react";
import { TFields } from "../../../types/FormObject";
import { MapTypeToCompoenet } from "./interface";
import {
  THtmlProps,
  TList,
  TNumber,
  TRequired,
} from "../../../types/TypeBasedProps";
import RequiredInputs from "./required/RequiredInputs";
import OptionalProperties from "./optionalProperties/OptionalProperties";
import HtmlProperties from "./htmlProperties/HtmlProperties";
import Collapsible from "../../../compoenents/Collapsible";
import Sidebar from "../../../compoenents/Sidebar";

const FieldMaker = () => {
  const [singleField, setSingleField] = useState<TFields>({
    id: "",
    fieldName: "",
    fieldType: "",
  });
  const [inputMode, setinputMode] = useState({
    required: true,
    typeBased: false,
    optional: false,
    HtmlProps: false,
  });

  const ChangeMode = {
    required: () => {
      let x = {
        required: true,
        typeBased: false,
        optional: false,
        HtmlProps: false,
      };
      setinputMode(x);
    },
    typeBased: () => {
      let x = {
        required: false,
        typeBased: true,
        optional: false,
        HtmlProps: false,
      };
      setinputMode(x);
    },
    optional: () => {
      let x = {
        required: false,
        typeBased: false,
        optional: true,
        HtmlProps: false,
      };
      setinputMode(x);
    },
    HtmlProps: () => {
      let x = {
        required: false,
        typeBased: false,
        optional: false,
        HtmlProps: true,
      };
      setinputMode(x);
    },
  };
  const Actions = {
    requiredFields: {
      Next: (object: TRequired) => {
        let xx = { ...singleField };
        object.id ? (xx.id = object.id) : null;
        object.fieldName ? (xx.fieldName = object.fieldName) : null;
        object.fieldType ? (xx.fieldType = object.fieldType) : null;
        setSingleField(xx);
        ChangeMode.typeBased();
      },
    },
    typeBased: {
      Number: {
        HandlePropsApply: (object: TNumber) => {
          let x = { ...singleField };
          object.numberMin ? (x.numberMin = object.numberMin) : null;
          object.numberMax ? (x.numberMax = object.numberMax) : null;
          object.numberDecimal
            ? (x.numberDecimal = object.numberDecimal)
            : null;
          object.validation ? (x.validation = object.validation) : null;
          setSingleField(x);
          ChangeMode.HtmlProps();
        },
        SkipHandle: () => {
          ChangeMode.HtmlProps();
        },
      },
      List: {
        handlePropsApply: (object: TList) => {
          let x = { ...singleField };
          x.options = object.options;
          object.data ? (x.data = object.data) : null;
          setSingleField(x);
          ChangeMode.HtmlProps();
        },
      },
    },
    HtmlProps: {
      Apply: (object: THtmlProps) => {
        let x = { ...singleField };
        x.visible = object.visible ? true : false;
        x.enable = object.enable ? true : false;
        x.required = object.required ? true : false;
        setSingleField({ ...x });
        ChangeMode.optional();
      },
      SkipHandle: () => {
        ChangeMode.optional();
      },
    },
  };

  return (
    <div>
      <Collapsible
        isOpen={inputMode.required}
        onClick={() => {
          if (!inputMode.required) ChangeMode.required();
        }}
        title="this is a collapsable"
      >
        <div>
          <RequiredInputs
            onNext={Actions.requiredFields.Next}
            RequiredProperties={{
              id: singleField.id,
              fieldName: singleField.fieldName,
              fieldType: singleField.fieldType,
            }}
          />
        </div>
      </Collapsible>

      {/* {inputMode.required && (
        <RequiredInputs
          onNext={Actions.requiredFields.Next}
          RequiredProperties={{
            id: singleField.id,
            fieldName: singleField.fieldName,
            fieldType: singleField.fieldType,
          }}
        />
      )} */}

      {inputMode.typeBased &&
        (() => {
          switch (singleField.fieldType) {
            case "number":
              return (
                <>
                  <h2>Type Based Properties</h2>
                  <MapTypeToCompoenet.number
                    // NumberFieldsSchema={{
                    //   numberDecimal: singleField.numberDecimal,
                    //   numberMax: singleField.numberMax,
                    //   numberMin: singleField.numberMin,
                    //   validation: singleField.validation,
                    // }}
                    onApplyProperties={
                      Actions.typeBased.Number.HandlePropsApply
                    }
                    onSkipProperties={Actions.typeBased.Number.SkipHandle}
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
                      options: singleField.options ? singleField.options : [],
                      data: singleField.data ? singleField.data : [],
                    }}
                    onApply={Actions.typeBased.List.handlePropsApply}
                  />
                </>
              );

            default:
              ChangeMode.HtmlProps();
              return null;
          }
        })()}

      {inputMode.HtmlProps && (
        <HtmlProperties
          onApply={Actions.HtmlProps.Apply}
          onSkip={Actions.HtmlProps.SkipHandle}
        />
      )}
      {inputMode.optional && <OptionalProperties />}
    </div>
  );
};

export default FieldMaker;

// const abc = {
//   numberDecimal: true,
//   numberMin: 4,
//   numberMax: 10,
//   validation: {
//     rules: [{ type: "w", rule: "abc", msg: "abc", color: "red" }],
//   },
// };
// const req = {
//   id: "req",
//   fieldName: "abc",
//   fieldType: "number",
// };
// const l1: TList = {
//   options: ["abc", "bcd"],
//   data: ["aa1", "aa2"],
// };
