import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "vijay123456",
    })
    .expect(201);
});

it("returns a 400 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password123",
    })
    .expect(400);
});

it("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pa",
    })
    .expect(400);
});

it("disallows the duplication of email ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "svmsarma11@gmail.com",
      password: "visssss",
    })
    .expect(201);
});
