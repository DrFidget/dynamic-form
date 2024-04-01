import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FormResponse = new Schema({
  // FormName: String,
  FormId: String,
  Responses: [
    {
      // id: String,
      timeStamp: String,
      response: Array,
    },
  ],
});

const Response = model("Response", FormResponse);
export default Response;
