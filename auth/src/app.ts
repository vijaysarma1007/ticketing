import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { singoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@vjtickets/commoncode";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

//# Route Handling Middleware
app.use(currentUserRouter);
app.use(signinRouter);
app.use(singoutRouter);
app.use(signupRouter);

//# Throws an error if route not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//# Error Handling Middleware
app.use(errorHandler);

export { app };
