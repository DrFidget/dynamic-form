import { Request, Response, NextFunction } from "express";
import UserAuthModel from "./Auth.model.js";
import { TUserAuth } from "../../types/UserAuth.js";
import bcrypt from "bcrypt"; // Assuming you have a separate file for token generation
import jwt from "jsonwebtoken";

export const UserAuthMethods = {
  login: async (req: Request, res: Response) => {
    try {
      const userBody = req.body as TUserAuth;
      const user = (await UserAuthModel.findOne({
        email: userBody.email,
      })) as any;

      if (!user) {
        return res.status(404).send("User not found");
      }

      const passwordMatch = await bcrypt.compare(
        userBody.password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).send("Invalid password");
      }

      const token = user.generateAuthToken();

      res.status(200).send(token);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  signup: async (req: Request, res: Response) => {
    try {
      const userBody = req.body as TUserAuth;

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
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}

export function authToken(req: Request, res: Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);

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

      res.status(200).send(user);
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
