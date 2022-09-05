"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroupsAndPeopleInGroupM = exports.updateGroupByIDM = exports.createGroupM = exports.deleteGroupByIDM = exports.getGroupByIDM = void 0;
const repository_1 = require("./repository");
const getGroupByIDM = (id) => {
    return (0, repository_1.getGroupByID)(id);
};
exports.getGroupByIDM = getGroupByIDM;
const deleteGroupByIDM = (id) => {
    return (0, repository_1.deleteGroupByID)(id);
};
exports.deleteGroupByIDM = deleteGroupByIDM;
const createGroupM = (group) => {
    return (0, repository_1.createGroup)(group);
};
exports.createGroupM = createGroupM;
const updateGroupByIDM = (group, groupID) => {
    return (0, repository_1.updateGroupByID)(group, groupID);
};
exports.updateGroupByIDM = updateGroupByIDM;
const getAllGroupsAndPeopleInGroupM = (id) => {
    return (0, repository_1.getAllGroupsAndPeopleInGroup)(id);
};
exports.getAllGroupsAndPeopleInGroupM = getAllGroupsAndPeopleInGroupM;
//# sourceMappingURL=manager.js.map