import { personModel } from "./model";
import IPerson from "./interface";
import {getGroupByID}  from "../group/repository";
import { groupModel } from "../group/model";
import IGroup from "../group/interface";

export const getPersonByID = (id: string) => {
    console.log(id);
    
    return personModel.findById(id) //.orFail(new Error('not found'));
};

export const deletePersonByID = (id: string) => {
    return personModel.findOneAndRemove({_id:id});
};

export const createPerson = async (person: IPerson) => {
    let personID: any;
    const createdPerson = await personModel.create(person, (err, onePerson) => 
    {
        console.log(onePerson)
        if (err) 
            { console.log(err); }
        else
            { personID = onePerson._id;
                personID = personID.toString(); }
    });

	person.groups.forEach( async (group) => {
        const foundGroup : (IGroup | null) = await groupModel.findById(group as string);
        if(foundGroup)
        {
            let name: string = foundGroup.name;
            let groups: string[] | IGroup[] = foundGroup.groups;
            let persons: string[] | IPerson[] = foundGroup.people; 
            persons.push(personID);
            await groupModel.findByIdAndUpdate(foundGroup, { name: name, groups: groups, persons: persons });
        }
        else
            console.error("cant find group");
    });
};

export const updatePersonByID = (person: IPerson, id: string) => {
    return personModel.replaceOne(getPersonByID(id), person);
};

export const getPersonInGroupByName = async (name: string, groupID: string) => {
    let personFound = null;
    const group = await getGroupByID(groupID);
    await group?.people.forEach( async (person) => {
        if (await personModel.findById(person).equals(name))
            personFound = await getPersonByID(person as string);
    });

    return personFound; 
};

export const getAllGroupsOfPerson = async (id: string) => {
    const person =  (await getPersonByID(id))
    return person?.groups;
};

