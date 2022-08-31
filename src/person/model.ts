import mongoose from "mongoose";
import IPerson from "./interface";
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    groups: {
        type: [String],
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

personSchema.index({
    firstName: 1,
    lastName: 1,
    age: -1
});

export const personModel = mongoose.model<IPerson & mongoose.Document>('Group', personSchema);