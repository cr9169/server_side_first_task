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
const model_2 = require("../person/model");
const deleteGroupByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield model_1.groupModel.findById(id);
    if ((group === null || group === void 0 ? void 0 : group.groups.length) == 0)
        return model_1.groupModel.findOneAndRemove({ _id: id });
    const groups = group === null || group === void 0 ? void 0 : group.groups;
    groups.forEach((group) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.deleteGroupByID)(group);
    }));
});
exports.deleteGroupByID = deleteGroupByID;
const createGroup = (groupName) => {
    return model_1.groupModel.create({ name: groupName,
        persons: [],
        groups: [] });
};
exports.createGroup = createGroup;
const updateGroupByID = (group, groupID) => __awaiter(void 0, void 0, void 0, function* () {
    const foundGroup = yield model_1.groupModel.findById(groupID);
    if (foundGroup)
        foundGroup.people.forEach((person) => __awaiter(void 0, void 0, void 0, function* () {
            let foundPerson = yield model_2.personModel.findById(person);
            if (foundPerson) {
                let personGroups = foundPerson === null || foundPerson === void 0 ? void 0 : foundPerson.groups;
                personGroups.push(groupID);
                yield model_2.personModel.findByIdAndUpdate(person, { firstName: foundPerson.firstName, lastName: foundPerson.lastName,
                    age: foundPerson.age, groups: personGroups });
            }
        }));
    return model_1.groupModel.findByIdAndUpdate(groupID, group);
});
exports.updateGroupByID = updateGroupByID;
const getAllGroupsAndPeopleInGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield model_1.groupModel.findById(id);
    return model_1.groupModel.findById(id).populate('groups').populate('people');
});
exports.getAllGroupsAndPeopleInGroup = getAllGroupsAndPeopleInGroup;
const getGroupByID = (id) => {
    return model_1.groupModel.findById(id);
};
exports.getGroupByID = getGroupByID;
//# sourceMappingURL=repository.js.map