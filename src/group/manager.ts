import { getGroupByID, deleteGroupByID, createGroup, updateGroupByID, getAllGroupsAndPeopleInGroup } from "./repository";
import IGroup from "./interface";
import mongoose from "mongoose";

export const getGroupByIDM = (id: mongoose.Types.ObjectId) => {
    return getGroupByID(id); 
};

export const deleteGroupByIDM = (id: mongoose.Types.ObjectId) => {
    return deleteGroupByID(id);
};

export const createGroupM = (group: IGroup) => {
    /*const groups : mongoose.Types.ObjectId[] = group.groups;
    
    if(!groups.includes(group))*/
        return createGroup(group);
    /*else   
        console.error("group can't contain itself!")*/
};

export const updateGroupByIDM = (group: IGroup, groupID: mongoose.Types.ObjectId) => {

    if(group.groups.includes(groupID))
        console.error("group can't contain itself!");

    else
        return updateGroupByID(group, groupID);
};

export const getAllGroupsAndPeopleInGroupM = (id: mongoose.Types.ObjectId) => {
    return getAllGroupsAndPeopleInGroup(id);
};
