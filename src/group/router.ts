import express, { Router } from 'express';

const groupRoute : Router = express.Router();
  
groupRoute.get("/group", (req, res, next) => { // change to the bottom
  res.send("This is the group request");
});

// groupRoute.get("/group", getGroup);
// groupRoute.post(getGroupData);

export default groupRoute;