import IGroup from "./interface";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groups: {
        type: Array<String | IGroup>,
        ref: 'group',
        required: true
    },
    people: {
        type: Array<String | IGroup>,
        ref: 'person',
        required: true
    }
});

export const groupModel = mongoose.model<IGroup & mongoose.Document>('group', groupSchema);