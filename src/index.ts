import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { cookieJwtAuth } from "./middlewares/cookieJwtAuth";
import cookieParser from "cookie-parser";
import authorizationRoutes from "./routes/auth";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Parsers
app.use(cookieParser());
app.use(bodyParser.json());

// send all headers to the client
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

// Routes
app.use(authorizationRoutes);
app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/secureRoute", cookieJwtAuth, (req: Request, res: Response) => {
  res.send("Secure route");
});

app.get("/user/:userId", cookieJwtAuth, (req: Request, res: Response) => {
  res.status(200).send({
    user: {
      id: "123617283",
      email: "req.user.email",
      name: "req.user.name",
    },
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    app.listen(port, () =>
      console.log(`Server is running on  http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  start();
}

export default app;
