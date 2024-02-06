import React, { useState } from "react";
import FormLoader from "./FormLoader";
import { useNavigate } from "react-router-dom";
const MainForm = ({ FormSchema, FormState, handleSubmit }) => {
  let navigate = useNavigate();
  return (
    <div className="" style={{}}>
      <form className=" bg-secondary ">
        <h1>FORM</h1>
        {FormState ? (
          <FormLoader
            FormState={FormState}
            submitAction={{
              submitText: "Done",
              stateOnLoad: true,
              onSubmit: (s, dict) => {
                // submit(s, dict);
                handleSubmit(s, dict);
                navigate("/");
              },
            }}
          />
        ) : (
          <FormLoader
            FormSchema={FormSchema}
            submitAction={{
              submitText: "Submit",
              stateOnLoad: false,
              onSubmit: (s, dict) => {
                // submit(s, dict);
                handleSubmit(s, dict);
                navigate("/");
              },
            }}
          />
        )}
      </form>
    </div>
  );
};

export default MainForm;
