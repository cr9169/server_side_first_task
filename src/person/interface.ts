import mongoose from "mongoose";

export interface IPerson {
    firstName: string,
    age: number,
    groups: mongoose.Types.ObjectId[], // maybe change to an array of type IGroup
    lastName: string
}

export default IPerson;