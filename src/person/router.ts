import express, { Router } from 'express';

const personRoute : Router = express.Router()
  
personRoute.get("/person", (req, res, next) => { // change to the bottom
  res.send("This is the person request");
});
  
// groupRoute.get("/person", getPerson);
// groupRoute.post(getPersonData);

export default personRoute;