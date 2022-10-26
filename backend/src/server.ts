import express from 'express';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import cors from 'cors';
import { config } from '../config';
import personRoute from './person/router';
import groupRoute from './group/router';
import { errorHandler } from '../errorHandler';

const app = express();
const PORT: number = config.SERVER_PORT;
const db = config.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use('/', personRoute);
app.use('/', groupRoute);
app.use(errorHandler);
app.use((req, res) => res.status(404).send('Route not found!'));

function connect() {
  mongoose
    .connect(`${db}/tsTask`)
    .then(() => {
      console.log('Connected to db');
      app.listen(PORT, async () => {
        console.log(`server is listening to port ${PORT}`);
      });
    })
    .catch(() => {
      throw createHttpError(501, 'Unable to connect database');
    });
}

connect();

export default app;
