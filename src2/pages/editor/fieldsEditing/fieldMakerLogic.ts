import { useState } from "react";
import {
  TNumber,
  TList,
  TRequired,
  THtmlProps,
} from "../../../types/TypeBasedProps";
import { TFields } from "../../../types/FormObject";

interface doneFields {
  req: boolean;
  type: boolean;
  opt: boolean;
  html: boolean;
}

export const useChangeMode = () => {
  const [inputMode, setInputMode] = useState({
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
      setInputMode(x);
    },
    typeBased: () => {
      let x = {
        required: false,
        typeBased: true,
        optional: false,
        HtmlProps: false,
      };
      setInputMode(x);
    },
    optional: () => {
      let x = {
        required: false,
        typeBased: false,
        optional: true,
        HtmlProps: false,
      };
      setInputMode(x);
    },
    HtmlProps: () => {
      let x = {
        required: false,
        typeBased: false,
        optional: false,
        HtmlProps: true,
      };
      setInputMode(x);
    },
  };

  return { inputMode, ChangeMode };
};

export const useDoneFields = (
  obj = { req: false, type: false, opt: false, html: false }
) => {
  const [doneFields, setDoneFields] = useState<doneFields>(obj);

  const setDone = (key: "req" | "type" | "opt" | "html") => {
    setDoneFields({ ...doneFields, [key]: true });
  };

  return { doneFields, setDone };
};

export const useActions = () => {
  const Actions = {
    requiredFields: {
      Next: (
        object: TRequired,
        singleField: TFields,
        setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
        ChangeMode: any,
        setDone: any
      ) => {
        let xx = { ...singleField };
        object.id ? (xx.id = object.id) : null;
        object.fieldName ? (xx.fieldName = object.fieldName) : null;
        object.fieldType ? (xx.fieldType = object.fieldType) : null;
        setSingleField(xx);
        ChangeMode.typeBased();
        setDone("req");
      },
    },
    typeBased: {
      Number: {
        HandlePropsApply: (
          object: TNumber,
          singleField: TFields,
          setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
          ChangeMode: any,
          setDone: any
        ) => {
          let x = { ...singleField };
          object.numberMin ? (x.numberMin = object.numberMin) : null;
          object.numberMax ? (x.numberMax = object.numberMax) : null;
          object.numberDecimal
            ? (x.numberDecimal = object.numberDecimal)
            : null;
          object.validation ? (x.validation = object.validation) : null;
          setSingleField(x);
          ChangeMode.HtmlProps();
          setDone("type");
        },
        SkipHandle: (ChangeMode: any, setDone: any) => {
          ChangeMode.HtmlProps();
          setDone("type");
        },
      },
      List: {
        handlePropsApply: (
          object: TList,
          singleField: TFields,
          setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
          ChangeMode: any,
          setDone: any
        ) => {
          let x = { ...singleField };
          x.options = object.options;
          if (object.data) {
            x.data = object.data;
          } else {
            if (x.data) delete x.data;
          }
          // object.data ? (x.data = object.data) : null;
          setSingleField(x);
          ChangeMode.HtmlProps();
          setDone("type");
        },
      },
      table: {
        onNext: (
          objList: TFields[],
          singleField: TFields,
          setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
          ChangeMode: any,
          setDone: any
        ) => {
          let x = { ...singleField };
          x.options = objList;
          setSingleField(x);
          ChangeMode.HtmlProps();
          setDone("type");
        },
      },
    },
    HtmlProps: {
      Apply: (
        object: THtmlProps,
        singleField: TFields,
        setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
        ChangeMode: any,
        setDone: any
      ) => {
        let x = { ...singleField };
        x.visible = object.visible ? true : false;
        x.enable = object.enable ? true : false;
        x.required = object.required ? true : false;
        setSingleField({ ...x });
        ChangeMode.optional();
        setDone("html");
      },
      SkipHandle: (ChangeMode: any, setDone: any) => {
        ChangeMode.optional();
        setDone("html");
      },
    },
  };

  return Actions;
};
