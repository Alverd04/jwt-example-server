// Create a supertest test for the login endpoint

import request from "supertest";

import app from "../src/index";

describe("POST /login", () => {
  it("should return a 200 status", async () => {
    const response = await request(app).post("/login").send({
      email: "john.doe@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
  });
});
