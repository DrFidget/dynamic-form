import React, { useState } from "react";
import FormLoader from "./FormLoader";

const MainForm = ({ FormSchema, submit }) => {
  return (
    <div className="" style={{}}>
      <form className=" bg-secondary ">
        <h1>FORM</h1>
        <FormLoader
          FormSchema={FormSchema}
          submitAction={{
            submitText: "Submit",
            stateOnLoad: false,
            onSubmit: (s) => {
              console.log("pressed");
              console.log(s);
              submit(s);
            },
          }}
        />
      </form>
    </div>
  );
};

export default MainForm;
