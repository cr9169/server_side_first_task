import IPerson from './interface';

export const inFirstButNotInSecond = (firstArray: string[], secondArray: string[]) => {
  const returnInFirstButNotInSecond: string[] = firstArray.filter((x) => !secondArray.includes(x));
  return returnInFirstButNotInSecond;
};

export const getGroupsAddedAndGroupsRemoved = (newPerson: IPerson, oldPerson: IPerson) => {
  const newPeopleGroups: string[] = newPerson.groups;
  const oldPeopleGroups: string[] = oldPerson.groups;

  const removedGroups: string[] = inFirstButNotInSecond(oldPeopleGroups, newPeopleGroups);
  const addedGroups: string[] = inFirstButNotInSecond(newPeopleGroups, oldPeopleGroups);

  return [removedGroups, addedGroups];
};
