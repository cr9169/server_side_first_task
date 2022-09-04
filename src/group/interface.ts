import { ObjectId } from "mongoose";

export interface IGroup {
    groups: ObjectId[], // maybe change to an array of type IGroup
    persons: ObjectId[] // maybe change to an array of type IPerson
}

export default IGroup;