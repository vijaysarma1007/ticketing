import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@vjtickets/commoncode";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

//# ROUTES
app.use(currentUser);
app.use(createChargeRouter);

//# Throws an error if route not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//# Error Handling Middleware
app.use(errorHandler);

export { app };
