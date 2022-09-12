"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateGroups = exports.getAllGroupsAndPeopleInGroupM = exports.updateGroupByIDM = exports.createGroupM = exports.deleteGroupByIDM = exports.getGroupByIDM = void 0;
const repository_1 = require("./repository");
const model_1 = require("./model");
const getGroupByIDM = (id) => {
    return (0, repository_1.getGroupByID)(id);
};
exports.getGroupByIDM = getGroupByIDM;
const deleteGroupByIDM = (id) => {
    return (0, repository_1.deleteGroupByID)(id);
};
exports.deleteGroupByIDM = deleteGroupByIDM;
const createGroupM = (groupName) => {
    return (0, repository_1.createGroup)(groupName);
};
exports.createGroupM = createGroupM;
const updateGroupByIDM = (group, groupID) => {
    if (group.groups.length == new Set(group.groups).size &&
        group.people.length == new Set(group.people).size && !group.groups.includes(groupID))
        return (0, repository_1.updateGroupByID)(group, groupID);
    console.error("cant update group");
};
exports.updateGroupByIDM = updateGroupByIDM;
const getAllGroupsAndPeopleInGroupM = (id) => {
    return (0, repository_1.getAllGroupsAndPeopleInGroup)(id);
};
exports.getAllGroupsAndPeopleInGroupM = getAllGroupsAndPeopleInGroupM;
const populateGroups = () => {
    return model_1.groupModel.find().populate('group').populate('person');
};
exports.populateGroups = populateGroups;
//# sourceMappingURL=manager.js.map