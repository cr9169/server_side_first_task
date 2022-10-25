import IGroup from './interface';

export const inFirstButNotInSecond = (firstArray: string[], secondArray: string[]) => {
  const returnInFirstButNotInSecond: string[] = firstArray.filter((x) => !secondArray.includes(x));
  return returnInFirstButNotInSecond;
};

export const getPeopleAddedAndPeopleRemoved = (newGroup: IGroup, oldGroup: IGroup) => {
  const newGroupPeople: string[] = newGroup.people;
  const oldGroupPeople: string[] = oldGroup.people;

  const removedPeople: string[] = inFirstButNotInSecond(oldGroupPeople, newGroupPeople);
  const addedPeople: string[] = inFirstButNotInSecond(newGroupPeople, oldGroupPeople);

  return [removedPeople, addedPeople];
};
