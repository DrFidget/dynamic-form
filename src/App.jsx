import React from "react";

// import FormLoader from "./compoenets/FormLoader";
import MainForm from "./compoenets/MainForm";
import { FormSchema } from "./compoenets/newForm/Schema/FormSchema";

const App = () => {
  return (
    <div>
      <MainForm FormSchema={FormSchema} />
      {/* <FormLoader FormSchema={FormSchema} /> */}
    </div>
  );
};

export default App;
