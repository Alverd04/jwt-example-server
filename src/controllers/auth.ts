// Create the user controller

import { Request, Response } from "express";
import User from "../entities/user";
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
    res.status(201).send({ user });
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
    return res.status(400).send("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "15m",
  });

  res.header("Authorization", `Bearer ${token}`);
  res.status(200).send({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.header("Authorization", "");
  res.send("Logged out");
};
