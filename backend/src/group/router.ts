import express, { Router } from 'express';
import {
  getGroupByIDC, deleteGroupByIDRegularC, deleteGroupByIDC, createGroupC,
  updateGroupByIDC, getAllGroupsAndPeopleInGroupC, getAllGroupsC, updateGroupObjectByIDC,
} from './controller';

const groupRoute : Router = express.Router();

groupRoute.get('/group/AllGroups', getAllGroupsC); //
groupRoute.get('/group/:id', getGroupByIDC); //
groupRoute.get('/group/All/:id', getAllGroupsAndPeopleInGroupC); // ..

groupRoute.delete('/group/:id', deleteGroupByIDC); //
groupRoute.delete('/group/regular/:id', deleteGroupByIDRegularC); //

groupRoute.post('/group', createGroupC); //
groupRoute.post('/group/update/:id', updateGroupByIDC); // ..
groupRoute.post('/group/update/group/object/:id', updateGroupObjectByIDC); //

export default groupRoute;
