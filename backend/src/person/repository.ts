import { personModel } from "./model";
import IPerson from "./interface";
import { groupModel } from "../group/model";
import IGroup from "../group/interface";

export const getPersonByID = (id: string) => {
    
    return personModel.findById(id) 
};

export const deletePersonByID = async (id: string) => {
    const person: IPerson | null = await personModel.findById(id);

    if(!person) throw new Error("Cant find person to delete");

    if (!person?.groups.length)
        return personModel.findOneAndRemove({_id:id});

    const personGroups: string[] = person?.groups;
    await Promise.allSettled(personGroups.map(async (group) => {
        const groupToUpdate: IGroup | null = await groupModel.findById(group);
        groupToUpdate?.people.splice(groupToUpdate?.people.indexOf(id), 1);
        await groupModel.updateOne({_id: group}, { people: groupToUpdate?.people, name: groupToUpdate?.name,  groups: groupToUpdate?.groups});
    }));

    return personModel.findOneAndRemove({_id:id});
};

export const deletePersonByIDRegular = async (id: string) => {
    const deletedPerson: IPerson | null = await personModel.findOneAndRemove({_id:id});
    if(!deletedPerson) throw new Error("Cant find person to delete");
    return deletedPerson;
};

export const simplyCreatePerson = async (person: IPerson) => {
    const createdPerson: IPerson = await personModel.create(person);
    if(!createdPerson) throw new Error("Cant create person");
    return createdPerson;
}

export const createPerson = async (person: IPerson) => {
    
    const createdPerson: IPerson = await personModel.create(person);

	await Promise.allSettled(createdPerson.groups.map( async (group) => {
        const foundGroup : IGroup | null = await groupModel.findById(group);
        if(foundGroup) 
        {
            let persons: string[] = foundGroup.people; 
            persons.push(createdPerson._id!);
            await groupModel.updateOne({_id: group}, { name: foundGroup.name, groups: foundGroup.groups, people: persons });
        }
    }));
};

export const updatePersonByID = async (person: IPerson, id: string) => { 
    const foundPerson = await personModel.findById(id);
    if(!foundPerson) throw new Error("Cant find person to update");
  
    await Promise.allSettled(person.groups.map( async (group: string) => {
        const personGroup: IGroup | null = await groupModel.findById(group);
        if(!personGroup?.people.includes(id))
        {
            const newPersonGroupPeople: string[] | undefined = personGroup?.people; 
            newPersonGroupPeople?.push(id);
            await groupModel.updateOne({_id: group}, { name: personGroup?.name, people: newPersonGroupPeople, groups: personGroup?.groups});
        }
    }));

    const allGroups: IGroup[] = await groupModel.find({});
    await Promise.allSettled(allGroups.map(async (groupFromAll) => {
        if((!person.groups.includes(groupFromAll._id!)) && groupFromAll.people.includes(id))
        {
            groupFromAll?.people.splice(groupFromAll?.people.indexOf(id), 1);
            await groupModel.updateOne({_id: groupFromAll._id}, { name: groupFromAll.name, people: groupFromAll?.people, groups: groupFromAll?.groups});
        }
    }));
    
    return personModel.updateOne({_id: id}, person);
};

export const updatePersonObjectByID = async (person: IPerson, id: string) => { 
    return personModel.updateOne({_id: id}, person);
};

export const getPersonInGroupByName = async (name: string, groupID: string) => {
    
    const personGroups: { groups: IGroup[] } = { groups: [] };
    const group = await groupModel.findById(groupID);
    
    if(!group)  throw new Error('group not found');

    for(const person of group.people) {
        const personFound: IPerson | null = await personModel.findById(person);
        if (personFound && personFound.firstName === name)
        {
            for(const personFoundgroup of personFound.groups) {
                const foundGroup: IGroup | null = await groupModel.findById(personFoundgroup);
                personGroups.groups.push(foundGroup!);
            };
            return personGroups; 
        }
    }
};

export const getAllGroupsOfPerson = async (id: string) => {
    const person = await personModel.findById(id).populate('groups');
    if(!person)  throw new Error("Cant find person");
    return person;
};

export const getAllPeople = async () => {
    const allPeople: IPerson[] = await personModel.find({});
    if(!allPeople)  throw new Error("Cant find people");
    return allPeople;
}