import { groupModel } from "./model";
import IGroup from "./interface";

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

export const updateGroupByID = async (group: IGroup, groupID: string) => {
    return groupModel.findByIdAndUpdate(groupID, group);
};

export const getAllGroupsAndPeopleInGroup = async (id: string): Promise<any[]> => {
    const groups = await getGroupByID(id);
    const persons = await getGroupByID(id);
    return [groups, persons];
};

export const getGroupByID = (id: string) => {
    return groupModel.findById(id); 
};