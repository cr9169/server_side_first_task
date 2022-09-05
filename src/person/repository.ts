import mongoose from "mongoose";
import { personModel } from "./model";
import IPerson from "./interface";
import {getGroupByID}  from "../group/repository";

export const getPersonByID = (id: mongoose.Types.ObjectId) => {
    console.log(id);
    
    return personModel.findById(id).orFail(new Error('not found'));
};

export const deletePersonByID = (id: mongoose.Types.ObjectId) => {
    return personModel.deleteOne(id).orFail(new Error('not found'));
};

export const createPerson = (person: IPerson) => {
    return personModel.create(person);
};

export const updatePersonByID = (person: IPerson, id: mongoose.Types.ObjectId) => {
    return personModel.replaceOne(getPersonByID(id), person).orFail(new Error('not found'));
};

export const getPersonInGroupByName = async (name: string, groupID: mongoose.Types.ObjectId) => {
    let personFound = null;
    const id = await getGroupByID(groupID);
    await id.persons.forEach( async (person: mongoose.Types.ObjectId) => {
        if (await personModel.findById(person).equals(name))
            personFound = await getPersonByID(person);
    });

    return personFound; // might be null if person not found
};

export const getAllGroupsOfPerson = async (id: mongoose.Types.ObjectId) => {
    const groups = await (await getPersonByID(id)).groups;
    return groups;
};

