import mongoose from "mongoose";
import IGroup from "./interface";
import { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groups: {
        type: Array<ObjectId>,
        required: true
    },
    people: {
        type: Array<ObjectId>,
        required: true
    }
});

export const groupModel = mongoose.model<IGroup & mongoose.Document>('Group', groupSchema);