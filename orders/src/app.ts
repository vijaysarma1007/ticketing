import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@vjtickets/commoncode";

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
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);

//# Throws an error if route not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

//# Error Handling Middleware
app.use(errorHandler);

export { app };
