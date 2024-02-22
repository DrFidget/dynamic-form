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
              onSubmit: (dict, x) => {
                // submit(s, dict);
                handleSubmit(dict, x);
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
              onSubmit: (dict, x) => {
                // submit(s, dict);
                handleSubmit(dict, x);
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
