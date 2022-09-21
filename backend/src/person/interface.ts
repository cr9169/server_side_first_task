import IGroup from "../group/interface";

export interface IPerson {
    firstName: string,
    age: number,
    groups: string[] | IGroup[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;