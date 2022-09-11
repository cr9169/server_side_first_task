import { getPersonByID, deletePersonByID, createPerson, updatePersonByID, getPersonInGroupByName, getAllGroupsOfPerson} from "./repository";
import IPerson from "./interface";
import { personModel } from "./model";

export const getPersonByIDM = (id: string) => {
    return getPersonByID(id); // .then().catch();
};

export const deletePersonByIDM = (id: string) => {
    return  deletePersonByID(id);
};

export const createPersonM = (person: IPerson) => {
    return createPerson(person);
};

export const updatePersonByIDM = (person: IPerson, id: string) => {
    return updatePersonByID(person, id);
};

export const getPersonInGroupByNameM = (name: string, groupID: string) => {
    return getPersonInGroupByName(name, groupID);
};

export const getAllGroupsOfPersonM = (id: string) => {
    return getAllGroupsOfPerson(id);
};

export const populatePeople = () => {
    return personModel.find().populate('group');
}

