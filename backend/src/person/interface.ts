import IGroup from "../group/interface";

export interface IPerson {
    _id: string,
    firstName: string,
    age: number,
    groups: string[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;