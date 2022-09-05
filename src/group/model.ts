import IGroup from "./interface";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groups: {
        type: Array<mongoose.Types.ObjectId>,
        required: true
    },
    people: {
        type: Array<mongoose.Types.ObjectId>,
        required: true
    }
});

export const groupModel = mongoose.model<IGroup & mongoose.Document>('Group', groupSchema);