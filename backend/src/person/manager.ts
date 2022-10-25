import {
  getPersonByID, deletePersonByID, createPerson, updatePersonByID, getPersonInGroupByName,
  getAllGroupsOfPerson, getAllPeople, updatePersonObjectByID, simplyCreatePerson, deletePersonByIDRegular,
} from './repository';
import IPerson from './interface';
import personModel from './model';

export const getPersonByIDM = (id: string) => getPersonByID(id);

export const getAllPeopleM = () => getAllPeople();

export const deletePersonByIDM = (id: string) => deletePersonByID(id);

export const deletePersonByIDRegularM = (id: string) => deletePersonByIDRegular(id);

export const simplyCreatePersonM = (person: IPerson) => simplyCreatePerson(person);

export const createPersonM = (person: IPerson) => createPerson(person);

export const updatePersonByIDM = (person: IPerson, id: string) => updatePersonByID(person, id);

export const updatePersonObjectByIDM = (person: IPerson, id: string) => updatePersonObjectByID(person, id);

export const getPersonInGroupByNameM = (name: string, groupID: string) => getPersonInGroupByName(name, groupID);

export const getAllGroupsOfPersonM = (id: string) => getAllGroupsOfPerson(id);

export const populatePeople = () => personModel.find().populate('groups');
