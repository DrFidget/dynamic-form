import React, { useState } from "react";
import FormLoader from "./FormLoader";

const MainForm = ({ FormSchema, DefaultMethods }) => {
  return (
    <div className="" style={{}}>
      <form className=" bg-secondary w-50">
        <h1>FORM</h1>
        <FormLoader
          DefaultMethods={DefaultMethods}
          FormSchema={FormSchema}
          submitAction={{
            submitText: "Submit",
            onSubmit: (s) => {
              console.log("pressed");
              console.log(s);
            },
          }}
        />
      </form>
    </div>
  );
};

export default MainForm;
