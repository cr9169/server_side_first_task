import { getGroupByID, deleteGroupByID, createGroup, updateGroupByID, getAllGroupsAndPeopleInGroup } from "./repository";
import { ObjectId } from "mongoose";
import IGroup from "./interface";
import mongoose from "mongoose";

export const getGroupByIDM = (id: mongoose.Types.ObjectId) => {
    return getGroupByID(id); 
};

export const deleteGroupByIDM = (id: mongoose.Types.ObjectId) => {
    return deleteGroupByID(id);
};

export const createGroupM = (group: IGroup) => {
    return createGroup(group);
};

export const updateGroupByIDM = (group: IGroup, groupID: mongoose.Types.ObjectId) => {
    return updateGroupByID(group, groupID);
};

export const getAllGroupsAndPeopleInGroupM = (id: mongoose.Types.ObjectId) => {
    return getAllGroupsAndPeopleInGroup(id);
};
