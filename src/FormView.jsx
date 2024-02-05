import React, { useState } from "react";
import MainForm from "./compoenets/MainForm";
import { FormSchema } from "./compoenets/newForm/Schema/FormSchema";
import FormReport from "./formReport/FormReport";

const FormView = () => {
  const containerStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const boxStyles = {
    width: "50%" /* Equal width for both divs */,

    height: "100px" /* Just for demonstration */,
  };
  const [formData, setFormData] = useState(null);

  const submitted = (e) => {
    setFormData(e);
  };
  return (
    <div style={containerStyles}>
      <div style={boxStyles}>
        <MainForm FormSchema={FormSchema} submit={submitted} />
      </div>
      <div style={boxStyles}>
        <FormReport data={formData} />
      </div>
    </div>
  );
};

export default FormView;
