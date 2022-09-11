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
const deleteGroupByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield model_1.groupModel.findById(id);
    if ((group === null || group === void 0 ? void 0 : group.groups.length) == 0)
        return model_1.groupModel.findOneAndRemove({ _id: id }).orFail(new Error('not found'));
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
    return model_1.groupModel.findByIdAndUpdate(groupID, group).orFail(new Error('not found'));
});
exports.updateGroupByID = updateGroupByID;
const getAllGroupsAndPeopleInGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield (0, exports.getGroupByID)(id);
    const persons = yield (0, exports.getGroupByID)(id);
    return [groups, persons];
});
exports.getAllGroupsAndPeopleInGroup = getAllGroupsAndPeopleInGroup;
const getGroupByID = (id) => {
    return model_1.groupModel.findById(id).orFail(new Error('not found')).exec();
};
exports.getGroupByID = getGroupByID;
//# sourceMappingURL=repository.js.map