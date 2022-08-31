import { config } from "../config";
import express from "express";
import personRoute from "./person/router";
import groupRoute from "./group/router";

const app = express();
const PORT : number = config.SERVER_PORT;

app.use(express.json());

app.use("/", personRoute);
app.use("/", groupRoute);

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
});

