import { groupModel } from "./model";
import IGroup from "./interface";
import mongoose from "mongoose";


export const deleteGroupByID = (id: mongoose.Types.ObjectId) => {
    return groupModel.deleteOne(id).orFail(new Error('not found'));
};

export const createGroup = (group: IGroup) => {
    return groupModel.create(group);
};

export const updateGroupByID = (group: IGroup, groupID: mongoose.Types.ObjectId) => {
    return groupModel.replaceOne(getGroupByID(groupID), group).orFail(new Error('not found'));
};

export const getAllGroupsAndPeopleInGroup = async (id: mongoose.Types.ObjectId) => {
    const groups =  (await getGroupByID(id)).groups;
    const people =  (await getGroupByID(id)).persons;
    
    return [groups, people];
};

export const getGroupByID = (id: mongoose.Types.ObjectId) => {
    return groupModel.findById(id).orFail(new Error('not found'));
};