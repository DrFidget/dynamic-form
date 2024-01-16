import React from "react";

import FormLoader from "./compoenets/FormLoader";
import { FormSchema } from "./compoenets/newForm/Schema/FormSchema";

const App = () => {
  return (
    <div>
      <FormLoader FormSchema={FormSchema} />
    </div>
  );
};

export default App;
