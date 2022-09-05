"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroupsOfPersonM = exports.getPersonInGroupByNameM = exports.updatePersonByIDM = exports.createPersonM = exports.deletePersonByIDM = exports.getPersonByIDM = void 0;
const repository_1 = require("./repository");
const getPersonByIDM = (id) => {
    return (0, repository_1.getPersonByID)(id);
};
exports.getPersonByIDM = getPersonByIDM;
const deletePersonByIDM = (id) => {
    return (0, repository_1.deletePersonByID)(id);
};
exports.deletePersonByIDM = deletePersonByIDM;
const createPersonM = (person) => {
    return (0, repository_1.createPerson)(person);
};
exports.createPersonM = createPersonM;
const updatePersonByIDM = (person, id) => {
    return (0, repository_1.updatePersonByID)(person, id);
};
exports.updatePersonByIDM = updatePersonByIDM;
const getPersonInGroupByNameM = (name, groupID) => {
    return (0, repository_1.getPersonInGroupByName)(name, groupID);
};
exports.getPersonInGroupByNameM = getPersonInGroupByNameM;
const getAllGroupsOfPersonM = (id) => {
    return (0, repository_1.getAllGroupsOfPerson)(id);
};
exports.getAllGroupsOfPersonM = getAllGroupsOfPersonM;
//# sourceMappingURL=manager.js.map