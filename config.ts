import dotenv from 'dotenv'
dotenv.config();

export const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3000
}

