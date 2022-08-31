import { text } from "express";
import mongoose from "mongoose";
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

export const mongoosePerson = mongoose.model('Person', groupSchema); 