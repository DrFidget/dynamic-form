import UserAuthModel from "./Auth.model.js";
import bcrypt from "bcrypt"; // Assuming you have a separate file for token generation
export const UserAuthMethods = {
    login: async (req, res) => {
        try {
            const userBody = req.body;
            const user = (await UserAuthModel.findOne({
                email: userBody.email,
            }));
            if (!user) {
                return res.status(404).send("User not found");
            }
            const passwordMatch = await bcrypt.compare(userBody.password, user.password);
            if (!passwordMatch) {
                return res.status(401).send("Invalid password");
            }
            const token = user.generateAuthToken();
            res.status(200).send(token);
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    signup: async (req, res) => {
        try {
            const userBody = req.body;
            const userExists = await UserAuthModel.findOne({ email: userBody.email });
            if (userExists) {
                return res.status(409).send("Email already in use");
            }
            const hashedPassword = await bcrypt.hash(userBody.password, 10);
            await new UserAuthModel({
                ...userBody,
                password: hashedPassword,
            }).save();
            res.status(201).send("Created a new account");
        }
        catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
//# sourceMappingURL=Auth.service.js.map