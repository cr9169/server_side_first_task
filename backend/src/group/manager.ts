import {
  getGroupByID, deleteGroupByIDRegular, deleteGroupByID, createGroup,
  updateGroupByID, getAllGroupsAndPeopleInGroup, getAllGroups, updateGroupObjectByID,
} from './repository';
import IGroup from './interface';

export const getGroupByIDM = (id: string) => getGroupByID(id);

export const getAllGroupsM = () => getAllGroups();

export const deleteGroupByIDM = (id: string) => deleteGroupByID(id);

export const deleteGroupByIDRegularM = (id: string) => deleteGroupByIDRegular(id);

export const createGroupM = (groupName: string) => createGroup(groupName);

export const updateGroupByIDM = (group: IGroup, groupID: string) => updateGroupByID(group, groupID);

export const updateGroupObjectByIDM = (groupID: string, group: IGroup) => updateGroupObjectByID(groupID, group);

export const getAllGroupsAndPeopleInGroupM = (id: string) => getAllGroupsAndPeopleInGroup(id);
