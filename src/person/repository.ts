import { Model, Mongoose, ObjectId } from "mongoose";
import { personModel } from "./model";
import IPerson from "./interface";
import IGroup from "../group/interface";

export const getPersonByID = async (id: ObjectId) => {
    return await personModel.findById(id).orFail(new Error('not found'));
}

export const deletePersonByID = async (id: ObjectId) => {
    await personModel.deleteOne(id).orFail(new Error('not found'));
}

export const createPerson = async (person: IPerson) => {
    await personModel.create(person);
}

export const updatePersonByID = async (person: IPerson, id: ObjectId) => {
    await personModel.replaceOne(getPersonByID(id), person).orFail(new Error('not found'));
}

export const getPersonInGroupByName = async (name: string, group: IGroup) => {
    let personFound = null;
    await group.persons.forEach( async (person: ObjectId) => {
        if (await personModel.findById(person).equals(name))
            personFound = getPersonByID(person);
    });

    return personFound; // might be null if person not found
}

export const getAllGroupsOfPerson = async (id: ObjectId) => {
    const groups = await (await getPersonByID(id)).groups;
    return groups;
}

