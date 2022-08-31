import mongoose from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
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

export const mongooseGroup = mongoose.model('Group', groupSchema); 