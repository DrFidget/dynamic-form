import React, { useState } from "react";
import FormLoader from "./FormLoader";
import { useNavigate } from "react-router-dom";
const MainForm = ({ FormSchema, Values, handleSubmit }) => {
  let navigate = useNavigate();
  return (
    <div className="" style={{}}>
      <form className=" bg-secondary ">
        <h1>FORM</h1>
        {Values ? (
          <FormLoader
            FormSchema={FormSchema}
            Values={Values}
            submitAction={{
              submitText: "Done",
              stateOnLoad: true,
              onSubmit: (dict) => {
                // submit(s, dict);
                handleSubmit(dict);
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
              onSubmit: (dict) => {
                // submit(s, dict);
                handleSubmit(dict);
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
