import { getPersonByID, deletePersonByID, createPerson, updatePersonByID, getPersonInGroupByName, getAllGroupsOfPerson} from "./repository";
import mongoose from "mongoose";
import IPerson from "./interface";

export const getPersonByIDM = (id: mongoose.Types.ObjectId) => {
    return getPersonByID(id) // .then().catch();
};

export const deletePersonByIDM = (id: mongoose.Types.ObjectId) => {
    return  deletePersonByID(id);
};

export const createPersonM = (person: IPerson) => {
    return createPerson(person);
};

export const updatePersonByIDM = (person: IPerson, id: mongoose.Types.ObjectId) => {
    return updatePersonByID(person, id);
};

export const getPersonInGroupByNameM = (name: string, groupID: mongoose.Types.ObjectId) => {
    return getPersonInGroupByName(name, groupID);
};

export const getAllGroupsOfPersonM = (id: mongoose.Types.ObjectId) => {
    return getAllGroupsOfPerson(id);
};

