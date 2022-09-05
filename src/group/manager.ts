import { getGroupByID, deleteGroupByID, createGroup, updateGroupByID, getAllGroupsAndPeopleInGroup } from "./repository";
import { ObjectId } from "mongoose";
import IGroup from "./interface";

export const getGroupByIDM = async (id: ObjectId) => {
    await getGroupByID(id); 
};

export const deleteGroupByIDM = async (id: ObjectId) => {
    await deleteGroupByID(id);
};

export const createGroupM = async (group: IGroup) => {
    await createGroup(group);
};

export const updateGroupByIDM = async (group: IGroup, groupID: ObjectId) => {
    await updateGroupByID(group, groupID);
};

export const getAllGroupsAndPeopleInGroupM = async (id: ObjectId) => {
    await getAllGroupsAndPeopleInGroup(id);
};
