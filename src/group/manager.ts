import { getGroupByID, deleteGroupByID, createGroup, updateGroupByID, getAllGroupsAndPeopleInGroup } from "./repository";
import IGroup from "./interface";
import { groupModel } from "./model";

export const getGroupByIDM = (id: string) => { // insert await to everty call to a function that return promise
    return getGroupByID(id); 
};

export const deleteGroupByIDM = (id: string) => {
    return deleteGroupByID(id);
};

export const createGroupM = (groupName: string) => {
    return createGroup(groupName)
};

export const updateGroupByIDM = (group: IGroup, groupID: string) => {
    if(group.groups.length == new Set(group.groups as string[]).size &&
     group.people.length == new Set(group.people as string[]).size && !(group.groups as string[]).includes(groupID))
        return updateGroupByID(group, groupID);
    console.error("cant update group");
};

export const getAllGroupsAndPeopleInGroupM = (id: string) => {
    return getAllGroupsAndPeopleInGroup(id);
};

export const populateGroups = () => {
    return groupModel.find().populate('group').populate('person');
}
