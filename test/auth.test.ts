// Create a supertest test for the login endpoint

import request from "supertest";
import bcrypt from "bcrypt";
import app from "../src/index";
import mongoose from "mongoose";
import UserSchema from "../src/entities/user";

describe("Auth Login", () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-example-test");
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should return a 200 status", async () => {
    await UserSchema.create({
      email: "john.doe@gmail.com",
      password: await bcrypt.hash("password", 10),
      name: "John Doe",
    });

    const response = await request(app).post("/login").send({
      email: "john.doe@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.headers.authorization).toMatch(/^Bearer /);
    expect(response.body).toHaveProperty("user");
  });

  it("should return a 400 status if the user does not exist", async () => {
    const response = await request(app).post("/login").send({
      email: "john.doe@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe('{"errorMessage":"User not found"}');
  });

  it("should return a 400 status if the password is invalid", async () => {
    await UserSchema.create({
      email: "john.doe@gmail.com",
      password: await bcrypt.hash("password", 10),
      name: "John Doe",
    });

    const response = await request(app).post("/login").send({
      email: "john.doe@gmail.com",
      password: "psword",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe('{"errorMessage":"Invalid password"}');
  });
});

describe("Auth Register", () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-example-test");
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should return a 200 status", async () => {
    const response = await request(app).post("/register").send({
      email: "john.doe@gmail.com",
      password: "password",
      name: "John Doe",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("should return a 400 status if the user already exists", async () => {
    await UserSchema.create({
      email: "john.doe@gmail.com",
      password: "password",
      name: "John Doe",
    });

    const response = await request(app).post("/register").send({
      email: "john.doe@gmail.com",
      password: "password",
      name: "John Doe",
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe(
      '{"message":"User validation failed: email: Email already exists"}'
    );
  });
});

describe("Auth Logout", () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/jwt-example-test");
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should return a 200 status and clear headers", async () => {
    const response = await request(app).post("/logout").send({
      email: "john.doe@gmail.com",
      password: "password",
      name: "John Doe",
    });

    expect(response.status).toBe(200);
    expect(response.headers.authorization).toBe("");
    expect(response.body).toEqual({ message: "Logged out" });
  });
});
