import UserAuthModel from "./Auth.model.js";
import bcrypt from "bcrypt"; // Assuming you have a separate file for token generation
import jwt from "jsonwebtoken";
const refreshTokenList = [];
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
            const { token, refreshToken } = user.generateAuthToken();
            refreshTokenList.push(refreshToken);
            res.status(200).send({ token: token, refreshToken: refreshToken });
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
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access token is missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        const userId = decoded._id;
        try {
            const user = await UserAuthModel.findById(userId);
            if (!user) {
                return res.status(404).send("User not found");
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Authentication error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
export function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.status(401).send("Access token is missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                // Access token expired, try refreshing
                return refreshTokens(req, res, next);
            }
            return res.status(403).send("Invalid token");
        }
        const userId = decoded._id;
        try {
            const user = await UserAuthModel.findById(userId);
            if (!user) {
                return res.status(404).send("User not found");
            }
            res.status(200).send(user);
        }
        catch (error) {
            console.error("Authentication error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
const refreshTokens = async (req, res, next) => {
    const refrestToken = req.headers["refresh"];
    if (!refrestToken) {
        return res.status(403).json({ message: "Refresh token not provided" });
    }
    try {
        const decoded = jwt.verify(refrestToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await UserAuthModel.findById(decoded._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};
//# sourceMappingURL=Auth.service.js.map