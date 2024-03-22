import { useState } from "react";
import {
  TNumber,
  TList,
  TRequired,
  THtmlProps,
  TOptional,
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
  const setNotDone = (key: "req" | "type" | "opt" | "html") => {
    setDoneFields({ ...doneFields, [key]: false });
  };

  return { doneFields, setDone, setNotDone };
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
        if (singleField.fieldType) {
          if (singleField.fieldType !== object.fieldType) {
            xx = {} as TFields;
          }
        }

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
          if (x.numberMin) delete x.numberMin;
          if (x.numberMax) delete x.numberMax;
          if (x.numberDecimal) delete x.numberDecimal;
          if (x.validation) delete x.validation;

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
          if (x.data) delete x.data;
          if (x.options) delete x.options;

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
          if (x.options) delete x.options;
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
        if (x.visible) delete x.visible;
        if (x.enable) delete x.enable;
        if (x.required) delete x.required;
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

    OptionalProps: {
      Apply: (
        object: TOptional,
        singleField: TFields,
        setSingleField: React.Dispatch<React.SetStateAction<TFields>>,
        setDone: any
      ) => {
        console.log(object);

        let x = { ...singleField };
        if (x.altId) delete x.altId;
        if (x.groupId) delete x.groupId;
        if (x.tag) delete x.tag;
        if (x.default) delete x.default;
        if (x.binding) delete x.binding;
        if (x.lookup) delete x.lookup;

        object.altId ? (x.altId = object.altId) : null;
        object.groupId ? (x.groupId = object.groupId) : null;
        object.tag ? (x.tag = object.tag) : null;
        object.default ? (x.default = object.default) : null;
        object.binding ? (x.binding = object.binding) : null;
        object.lookup ? (x.lookup = object.lookup) : null;

        setSingleField({ ...x });
        setDone("opt");
      },
      SkipHandle: (setDone: any) => {
        setDone("opt");
      },
    },
  };

  return Actions;
};
