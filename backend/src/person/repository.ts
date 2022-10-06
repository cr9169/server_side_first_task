import { personModel } from "./model";
import IPerson from "./interface";
import { groupModel } from "../group/model";
import IGroup from "../group/interface";

export const getPersonByID = (id: string) => {
    
    return personModel.findById(id) //.orFail(new Error('not found'));
};

export const deletePersonByID = (id: string) => {
    return personModel.findOneAndRemove({_id:id});
};

export const createPerson = async (person: IPerson) => {
    
    const createdPerson: IPerson = await personModel.create(person);

	createdPerson.groups.forEach( async (group) => {
        const foundGroup : IGroup | null = await groupModel.findById(group);
        if(foundGroup)
        {
            let name: string = foundGroup.name;
            let groups: string[] = foundGroup.groups;
            let persons: string[] = foundGroup.people; 
            persons.push(createdPerson._id!);
            await groupModel.updateOne({_id: group}, { name: name, groups: groups, people: persons });
        }
        else
            console.error("cant find group");
    });
};

export const updatePersonByID = async (person: IPerson, id: string) => { // check if the actuall function is the problem in the backend (or the frontend)
    const foundPerson = await personModel.findById(id);
    if(foundPerson)
    {
        foundPerson.groups.forEach( async (group: string) => {

            let foundGroup: IGroup | null = await groupModel.findById(group);
            let groupGroups: string[] = (foundGroup?.groups as string[]);

            if(!person.groups.includes(group))
            {    
                const index = groupGroups.indexOf(id, 0);
                if (index > -1) {
                    groupGroups.splice(index, 1);
                }
            }

            else 
            {
                if(!groupGroups.includes(id))
                    groupGroups.push(id);
            }

            await personModel.updateOne({_id: person}, { firstName: foundPerson!.firstName, lastName: foundPerson!.lastName,
                age: foundPerson!.age, groups: groupGroups});
        });
    }

    return personModel.findByIdAndUpdate(id, person, { new: true });
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
    const prs = await personModel.findById(id).populate('groups');
    console.log(prs);
    return prs;
};

export const getAllPeople = () => {
    
    return personModel.find({});
}