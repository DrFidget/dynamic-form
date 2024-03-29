import React from "react";
import { useLocation } from "react-router-dom";
import MainForm from "../../../src/compoenets/MainForm";

const FormPresenter = () => {
  const loaction = useLocation();
  const { FormDataToLoad } = loaction.state;

  return (
    <div>
      <div>
        <MainForm
          FormSchema={FormDataToLoad.Schema}
          handleSubmit={(dict: any, data: any) => {
            console.log("dictionary", dict);
            console.log("form data", data);
          }}
          Values={undefined}
        />
      </div>
    </div>
  );
};

export default FormPresenter;
