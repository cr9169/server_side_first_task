import { config } from "./config";
import express from "express";

// import routes from './router';

const app = express();
const PORT = config.SERVER_PORT;

app.use(express.json());

// app.use(routes);

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
});

