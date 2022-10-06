import { groupModel } from "./model";
import IGroup from "./interface";
import { personModel } from "../person/model";
import IPerson from "../person/interface";

export const deleteGroupByID = async (id: string | null | undefined) => {
    const group = await groupModel.findById(id);

    if (group?.groups.length == 0)
        return groupModel.findOneAndRemove({_id:id});

    const groups = group?.groups;
    groups!.forEach(async (group) => {
        await deleteGroupByID(group as string);
    });
}


export const createGroup = (groupName: string) => { 

    return groupModel.create({name: groupName,
                              persons: [], 
                              groups: []}); 
};

export const updateGroupByID = async (group: IGroup, groupID: string) => { // update also groups of group 
    const foundGroup = await groupModel.findById(groupID);
    if(foundGroup)
    {
        foundGroup.people.forEach( async (person: string) => {
            let foundPerson: IPerson | null = await personModel.findById(person);

            if(foundPerson)
            {
                let personGroups: string[] = (foundPerson?.groups as string[]);
                personGroups.push(groupID);
                await personModel.findByIdAndUpdate(person, { firstName: foundPerson.firstName, lastName: foundPerson.lastName,
                                                age: foundPerson.age, groups: personGroups});
            }
        });

        foundGroup.groups.forEach( async (group: string) => {
            let foundGroup: IGroup | null = await groupModel.findById(group);

            if(foundGroup)
            {
                let groupGroups: string[] = (foundGroup?.groups as string[]);
                groupGroups.push(groupID);
                await groupModel.findByIdAndUpdate(group, { Name: foundGroup.name, people: foundGroup.people, groups: groupGroups});
            }
        });
    }
    return groupModel.findByIdAndUpdate(groupID, group);
};

export const getAllGroupsAndPeopleInGroup = async (id: string) => {
    return groupModel.findById(id).populate('groups').populate('people');
};

export const getGroupByID = (id: string) => {
    return groupModel.findById(id); 
};

export const getAllGroups = () => {
    return groupModel.find({}); 
};