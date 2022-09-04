import { Model, Mongoose, ObjectId } from "mongoose";
import { groupModel } from "./model";
import IGroup from "./interface";
import IPerson from "../person/interface";

export const getGroupByID = (id: ObjectId) => {
    return groupModel.findById(id).orFail(new Error('not found'));
}

export const deleteGroupByID = async (id: ObjectId) => {
    await groupModel.deleteOne(id).orFail(new Error('not found'));
}

export const createGroup = async (group: IGroup) => {
    await groupModel.create(group);
}

export const updateGroupByID = async (group: IGroup, id: ObjectId) => {
    await groupModel.replaceOne(getGroupByID(id), group).orFail(new Error('not found'));
}


export const getAllGroupsAndPeopleInGroup = async (id: ObjectId) => {
    const groups = await (await getGroupByID(id)).groups;
    const people = await (await getGroupByID(id)).persons;
    
    return [groups, people];
}
