"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupByID = exports.getAllGroupsAndPeopleInGroup = exports.updateGroupByID = exports.createGroup = exports.deleteGroupByID = void 0;
const model_1 = require("./model");
const deleteGroupByID = (id) => {
    return model_1.groupModel.deleteOne(id).orFail(new Error('not found'));
};
exports.deleteGroupByID = deleteGroupByID;
const createGroup = (group) => {
    return model_1.groupModel.create(group);
};
exports.createGroup = createGroup;
const updateGroupByID = (group, groupID) => {
    return model_1.groupModel.replaceOne((0, exports.getGroupByID)(groupID), group).orFail(new Error('not found'));
};
exports.updateGroupByID = updateGroupByID;
const getAllGroupsAndPeopleInGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = (yield (0, exports.getGroupByID)(id)).groups;
    const people = (yield (0, exports.getGroupByID)(id)).persons;
    return [groups, people];
});
exports.getAllGroupsAndPeopleInGroup = getAllGroupsAndPeopleInGroup;
const getGroupByID = (id) => {
    return model_1.groupModel.findById(id).orFail(new Error('not found'));
};
exports.getGroupByID = getGroupByID;
//# sourceMappingURL=repository.js.map