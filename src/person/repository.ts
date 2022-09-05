import { ObjectId } from "mongoose";
import { personModel } from "./model";
import IPerson from "./interface";
import { getGroupByID } from "../group/repository";

export const getPersonByID = async (id: ObjectId) => {
    return await personModel.findById(id).orFail(new Error('not found'));
};

export const deletePersonByID = async (id: ObjectId) => {
    await personModel.deleteOne(id).orFail(new Error('not found'));
};

export const createPerson = async (person: IPerson) => {
    await personModel.create(person);
};

export const updatePersonByID = async (person: IPerson, id: ObjectId) => {
    await personModel.replaceOne(getPersonByID(id), person).orFail(new Error('not found'));
};

export const getPersonInGroupByName = async (name: string, groupID: ObjectId) => {
    let personFound = null;
    const id = await getGroupByID(groupID);
    await id.persons.forEach( async (person: ObjectId) => {
        if (await personModel.findById(person).equals(name))
            personFound = getPersonByID(person);
    });

    return personFound; // might be null if person not found
};

export const getAllGroupsOfPerson = async (id: ObjectId) => {
    const groups = await (await getPersonByID(id)).groups;
    return groups;
};

