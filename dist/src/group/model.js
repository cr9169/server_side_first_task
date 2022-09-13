"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groups: {
        type: (Array),
        ref: 'group',
        required: true
    },
    people: {
        type: (Array),
        ref: 'person',
        required: true
    }
});
exports.groupModel = mongoose_1.default.model('group', groupSchema);
//# sourceMappingURL=model.js.map