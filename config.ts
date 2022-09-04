import dotenv from 'dotenv'
dotenv.config();

export const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3000
}

export const uri = "mongodb://0.0.0.0:27017";

