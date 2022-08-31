import express, { Router } from 'express';

const personRoute : Router = express.Router()
  
personRoute.get("/person", (req, res, next) => {
  res.send("This is the person request");
});
  
export default personRoute;