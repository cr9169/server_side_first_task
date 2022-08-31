import mongoose from "mongoose";
const Schema = mongoose.Schema;

const personSchema = new Schema({
    groups: {
        type: [String],
        required: true
    },
    people: {
        type: [String],
        required: true
    }
});

export const mongoosePerson = mongoose.model('Person', personSchema); 