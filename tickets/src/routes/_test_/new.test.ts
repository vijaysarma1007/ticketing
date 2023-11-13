import request from "supertest";
import { Ticket } from "../../models/ticket";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const resposne = await request(app).post("/api/tickets").send({});

  expect(resposne.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});

it("Returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error of an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns an error of an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asda",
      price: -10,
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  //? add in a check to make sure ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  const title = "asdff";
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: title, price: 20 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(20);
});
