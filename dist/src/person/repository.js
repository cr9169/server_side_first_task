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
exports.getAllGroupsOfPerson = exports.getPersonInGroupByName = exports.updatePersonByID = exports.createPerson = exports.deletePersonByID = exports.getPersonByID = void 0;
const model_1 = require("./model");
const repository_1 = require("../group/repository");
const model_2 = require("../group/model");
const getPersonByID = (id) => {
    console.log(id);
    return model_1.personModel.findById(id);
};
exports.getPersonByID = getPersonByID;
const deletePersonByID = (id) => {
    return model_1.personModel.findOneAndRemove({ _id: id });
};
exports.deletePersonByID = deletePersonByID;
const createPerson = (person) => __awaiter(void 0, void 0, void 0, function* () {
    let personID;
    const createdPerson = yield model_1.personModel.create(person, (err, onePerson) => {
        console.log(onePerson);
        if (err) {
            console.log(err);
        }
        else {
            personID = onePerson._id;
            personID = personID.toString();
        }
    });
    person.groups.forEach((group) => __awaiter(void 0, void 0, void 0, function* () {
        const foundGroup = yield model_2.groupModel.findById(group);
        if (foundGroup) {
            let name = foundGroup.name;
            let groups = foundGroup.groups;
            let persons = foundGroup.people;
            persons.push(personID);
            yield model_2.groupModel.findByIdAndUpdate(foundGroup, { name: name, groups: groups, persons: persons });
        }
        else
            console.error("cant find group");
    }));
});
exports.createPerson = createPerson;
const updatePersonByID = (person, id) => {
    return model_1.personModel.replaceOne((0, exports.getPersonByID)(id), person);
};
exports.updatePersonByID = updatePersonByID;
const getPersonInGroupByName = (name, groupID) => __awaiter(void 0, void 0, void 0, function* () {
    let personFound = null;
    const group = yield (0, repository_1.getGroupByID)(groupID);
    yield (group === null || group === void 0 ? void 0 : group.people.forEach((person) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield model_1.personModel.findById(person).equals(name))
            personFound = yield (0, exports.getPersonByID)(person);
    })));
    return personFound;
});
exports.getPersonInGroupByName = getPersonInGroupByName;
const getAllGroupsOfPerson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return model_1.personModel.findById(id).populate('groups');
});
exports.getAllGroupsOfPerson = getAllGroupsOfPerson;
//# sourceMappingURL=repository.js.map