import mongoose from "mongoose";

export interface IGroup {
    groups: mongoose.Types.ObjectId[], // maybe change to an array of type IGroup
    persons: mongoose.Types.ObjectId[] // maybe change to an array of type IPerson
}

export default IGroup;