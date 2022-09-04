import { config, uri } from "../config";
import express from "express";
import personRoute from "./person/router";
import groupRoute from "./group/router";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { errorHandler } from "../errorHandler";

const app = express();
const PORT: number = config.SERVER_PORT;
const db = uri;

app.use(express.json());

app.use("/", personRoute);
app.use("/", groupRoute);

app.use(() => {
  throw createHttpError(404, "Rute not found!");
});
app.use(errorHandler);

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
        console.log("server is listening to port " + PORT);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });
