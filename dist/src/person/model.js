"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
        type: (Array),
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
exports.personModel = mongoose_1.default.model('Person', personSchema);
//# sourceMappingURL=model.js.map