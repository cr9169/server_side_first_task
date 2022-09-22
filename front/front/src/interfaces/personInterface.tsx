import IGroup from "./groupInterface";

export interface IPerson {
    firstName: string,
    age: number,
    groups: string[] | IGroup[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;