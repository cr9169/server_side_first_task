import mongoose from "mongoose";
import IGroup from "./interface";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groups: {
        type: [String],
        required: true
    },
    people: {
        type: [String],
        required: true
    }
});

export const groupModel = mongoose.model<IGroup & mongoose.Document>('Group', groupSchema);