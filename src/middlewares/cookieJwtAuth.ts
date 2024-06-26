import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const cookieJwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.header("authorization");
  const token = tokenHeader && tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    let payload: any = null;
    payload = jwt.verify(token, process.env.JWT_SECRET || "");

    if (!payload) {
      return res.status(400).send("Invalid token");
    }

    const user = await User.findOne({ _id: payload.id });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
      expiresIn: "15m",
    });

    res.header("Authorization", `Bearer ${newToken}`);

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
