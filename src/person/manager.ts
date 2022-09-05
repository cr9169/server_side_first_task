import { getPersonByID, deletePersonByID, createPerson, updatePersonByID, getPersonInGroupByName, getAllGroupsOfPerson} from "./repository";
import { ObjectId } from "mongoose";
import IPerson from "./interface";

export const getPersonByIDM = async (id: ObjectId) => {
    getPersonByID(id) // .then().catch();
};

export const deletePersonByIDM = async (id: ObjectId) => {
    await deletePersonByID(id);
};

export const createPersonM = async (person: IPerson) => {
    await createPerson(person);
};

export const updatePersonByIDM = async (person: IPerson, id: ObjectId) => {
    await updatePersonByID(person, id);
};

export const getPersonInGroupByNameM = async (name: string, groupID: ObjectId) => {
    await getPersonInGroupByName(name, groupID);
};

export const getAllGroupsOfPersonM = async (id: ObjectId) => {
    await getAllGroupsOfPerson(id);
};

