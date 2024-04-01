import mongoose from "mongoose";
const { Schema, model } = mongoose;
const FormResponse = new Schema({
    Name: String,
    Response: [{}],
});
//# sourceMappingURL=FormResponse.js.map