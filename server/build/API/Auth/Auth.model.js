import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(token, process.env.REFRESH_TOKEN_SECRET);
    return { token, refreshToken };
};
const UserAuthModel = model("User", userSchema);
export default UserAuthModel;
//# sourceMappingURL=Auth.model.js.map