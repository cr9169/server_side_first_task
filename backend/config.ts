import dotenv from 'dotenv';

dotenv.config();

const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
};

export default config;
