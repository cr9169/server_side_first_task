import express, { Router } from 'express';

const groupRoute : Router = express.Router()
  
groupRoute.get("/group", (req, res, next) => {
  res.send("This is the group request");
});
  
export default groupRoute;