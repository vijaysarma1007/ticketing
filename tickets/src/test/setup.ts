import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  //? payload
  const payload = {
    id: "12123123",
    email: "svmsarma11@gmail.com",
  };

  //? Create a jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //? const session
  const session = { jwt: token };

  //? turn session to json
  const sessionJSON = JSON.stringify(session);

  //?take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //?return a string thats a cookie with the encoded data
  return [`session=${base64}`];
};
