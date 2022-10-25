import groupModel from './model';
import IGroup from './interface';
import personModel from '../person/model';
import IPerson from '../person/interface';

export const deleteGroupByID = async (id: string | null | undefined) => {
  const group = await groupModel.findById(id);

  const allPeople: IPerson[] = await personModel.find({});

  await Promise.allSettled(
    allPeople.map(async (personFromAll) => {
      if (personFromAll.groups.includes(group?._id)) {
        personFromAll?.groups.splice(
          personFromAll?.groups.indexOf(group?._id),
          1,
        );
      }
      await personModel.updateOne(
        { _id: personFromAll._id },
        {
          firstName: personFromAll.firstName,
          lastName: personFromAll.lastName,
          age: personFromAll.age,
          groups: personFromAll?.groups,
        },
      );
    }),
  );

  if (group?.groups.length === 0) {
    return groupModel.findOneAndRemove({ _id: id });
  }

  const groups: string[] | undefined = group?.groups;
  if (groups) {
    await Promise.allSettled(
      groups?.map(async (groupFromGroups) => {
        await groupModel.findOneAndRemove({ _id: groupFromGroups });
        const allGroups = await groupModel.find({});

        await Promise.allSettled(
          allGroups.map(async (groupFromAll) => {
            if (groupFromAll.groups.includes(groupFromGroups)) {
              groupFromAll?.groups.splice(
                groupFromAll?.groups.indexOf(groupFromGroups),
                1,
              );
            }

            await groupModel.updateOne(
              { _id: groupFromAll._id },
              {
                name: groupFromAll?.name,
                people: groupFromAll?.people,
                groups: groupFromAll?.groups,
              },
            );
          }),
        );
      }),
    );
  }

  const deletedPerson = await groupModel.findOneAndRemove({ _id: id });
  return deletedPerson;
};

export const deleteGroupByIDRegular = async (id: string | null | undefined) => {
  const deletedGroup: IGroup | null = await groupModel.findOneAndRemove({
    _id: id,
  });
  if (!deletedGroup) throw new Error('Cant find group to delete');
  return deletedGroup;
};

export const createGroup = async (groupName: string) => {
  if (groupName === '' || !groupName) {
    throw new Error('Cant create group without name');
  }
  return groupModel.create({
    name: groupName,
    persons: [],
    groups: [],
  });
};

export const updateGroupByID = async (group: IGroup, groupID: string) => {
  // update also groups of group
  const foundGroup = await groupModel.findById(groupID);
  if (!foundGroup) throw new Error('Cant find group to update');

  if (group.people.length) {
    const res = await Promise.allSettled(
      group.people.map(
        async (personID: string) => personModel
          .findByIdAndUpdate(
            personID,
            { $addToSet: { groups: groupID } },
            { new: true },
          )
          .exec(),
      ),
    );
    console.log(JSON.stringify(res));
  }
  const allPeople: IPerson[] = await personModel.find({});
  // await Promise.allSettled(allPeople.map(async (personFromAll) => {
  //     if((!group.people.includes(personFromAll._id!)) && personFromAll.groups.includes(groupID))
  //     {
  //         personFromAll?.groups.splice(personFromAll?.groups.indexOf(groupID), 1);
  //         await personModel.updateOne({_id: personFromAll._id}, { firstName: personFromAll?.firstName,
  //             lastName: personFromAll?.lastName, age: personFromAll?.age, groups: personFromAll.groups});
  //     }
  // }));

  return groupModel.updateOne({ _id: groupID }, group);
};

export const updateGroupObjectByID = async (groupID: string, group: IGroup) => {
  // update also groups of group
  const updatedGroup = await groupModel.updateOne(
    { _id: groupID },
    { name: group.name, groups: group.groups, people: group.people },
  );
  if (!updatedGroup) throw new Error('Cant find group to update');
  return updatedGroup;
};

export const getAllGroupsAndPeopleInGroup = async (id: string) => groupModel.findById(id).populate('groups').populate('people');

export const getGroupByID = async (id: string) => {
  const foundGroup: IGroup | null = await groupModel.findById(id);
  if (!foundGroup) throw new Error('Cant find group');
  return foundGroup;
};

export const getAllGroups = async () => {
  const allGroups = await groupModel.find({});
  if (!allGroups) throw new Error('Cant find groups');
  return allGroups;
};
