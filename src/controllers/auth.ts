// Create the user controller

import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser } from "./user";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  try {
    await createUser({ user });
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "",

      {
        expiresIn: "15m",
      }
    );

    res.header("Authorization", `Bearer ${token}`);
    res.status(201).send({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    res.status(400).send({
      message: error.message,
    });
  }
};
// Login endpoint should return a JWT token and a refresh token
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({
      errorMessage: "User not found",
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).send({ errorMessage: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "15m",
  });

  res.header("Authorization", `Bearer ${token}`);
  res.status(200).send({
    message: "User logged in successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.header("Authorization", "");
  res.status(200).send({ message: "Logged out" });
};
