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

export const updateGroupByIDM = (group: IGroup, groupID: string) => {
  if (group.groups.length === new Set(group.groups as string[]).size
     && group.people.length === new Set(group.people as string[]).size
     && !(group.groups as string[]).includes(groupID)) { return updateGroupByID(group, groupID); }
  throw new Error('Cant update group');
};

export const updateGroupObjectByIDM = (groupID: string, group: IGroup) => updateGroupObjectByID(groupID, group);

export const getAllGroupsAndPeopleInGroupM = (id: string) => getAllGroupsAndPeopleInGroup(id);
