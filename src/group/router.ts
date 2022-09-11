import express, { Router } from 'express';
import { getGroupByIDC, deleteGroupByIDC, createGroupC, updateGroupByIDC, getAllGroupsAndPeopleInGroupC, getPopulatedGroups } from "./controller";

const groupRoute : Router = express.Router();

groupRoute.get("/group/:id", getGroupByIDC);
groupRoute.get("/group/All/:id", getAllGroupsAndPeopleInGroupC);
groupRoute.get("group/populated", getPopulatedGroups);

groupRoute.delete("/group/:id", deleteGroupByIDC);
  
groupRoute.post("/group/", createGroupC);
groupRoute.post("/group/update/:id", updateGroupByIDC);

export default groupRoute;