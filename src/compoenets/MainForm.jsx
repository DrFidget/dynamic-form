import React, { useState } from "react";
import FormLoader from "./FormLoader";
const MainForm = ({ FormSchema, Values, handleSubmit, Name }) => {
  return (
    <div className="" style={{}}>
      <form className=" bg-secondary ">
        <h1>{Name || "FORM"}</h1>
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
                // navigate("/");
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
                // navigate("/");
              },
            }}
          />
        )}
      </form>
    </div>
  );
};

export default MainForm;
