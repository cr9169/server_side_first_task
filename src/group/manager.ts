import { getGroupByID, deleteGroupByID, createGroup, updateGroupByID, getAllGroupsAndPeopleInGroup } from "./repository";
import IGroup from "./interface";

export const getGroupByIDM = (id: string) => { // insert await to everty call to a function that return promise
    return getGroupByID(id); 
};

export const deleteGroupByIDM = (id: string) => {
    return deleteGroupByID(id);
};

export const createGroupM = (groupName: string) => {
    /*const groups : mongoose.Types.ObjectId[] = group.groups;
    
    if(!groups.includes(group))*/
        return createGroup(groupName);
    /*else   
        console.error("group can't contain itself!")*/
};

export const updateGroupByIDM = (group: IGroup, groupID: string) => {

    return updateGroupByID(group, groupID);
};

export const getAllGroupsAndPeopleInGroupM = (id: string) => {
    return getAllGroupsAndPeopleInGroup(id);
};
