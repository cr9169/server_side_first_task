import express, { Router } from 'express';
import { getPersonByIDC, deletePersonByIDC, createPersonC, updatePersonByIDC, getPersonInGroupByNameC, getAllGroupsOfPersonC, getPopulatedPeople } from "./controller"

const personRoute: Router = express.Router();
  
personRoute.get("/person/:id", getPersonByIDC); //
personRoute.get("/person/:name/:id", getPersonInGroupByNameC); //
personRoute.get("/person/All/groups/:id", getAllGroupsOfPersonC); // 
personRoute.get("person/populated", getPopulatedPeople); //

personRoute.delete("/person/:id", deletePersonByIDC); //

personRoute.post("/person/", createPersonC); // 
personRoute.post("/person/update/:id", updatePersonByIDC); //

export default personRoute;