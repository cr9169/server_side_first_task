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

export const updatePersonByID = async (person: IPerson, id: string) => {
    const foundPerson = await personModel.findById(id);
    if(foundPerson)
        foundPerson.groups.forEach( async (group: any) => {
            let foundGroup: IGroup | null = await groupModel.findById(group);

            if(foundGroup)
            {
                let persons: string[] = (foundGroup?.people as string[]);
                persons.push(id);
                await groupModel.findByIdAndUpdate(group, { groups: foundGroup.groups, people: persons});
            }
        });
    return personModel.replaceOne(getPersonByID(id), person);
};

export const getPersonInGroupByName = async (name: string, groupID: string) => {
    let personFound: IPerson | null = null;
    const group = await groupModel.findById(groupID);

    if(!group) {
        return 'group not found';
    }
    for(const person of group.people) {
        personFound = await personModel.findById(person);
        if (personFound && personFound.firstName == name)
            return personModel.findById(person).populate('groups');
    }
};

export const getAllGroupsOfPerson = async (id: string) => {
    return personModel.findById(id).populate('groups');
};

