import { ObjectId } from "mongoose";

export interface IPerson {
    firstName: string,
    age: number,
    groups: ObjectId[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;