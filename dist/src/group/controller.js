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
exports.getPopulatedGroups = exports.getAllGroupsAndPeopleInGroupC = exports.updateGroupByIDC = exports.createGroupC = exports.deleteGroupByIDC = exports.getGroupByIDC = void 0;
const manager_1 = require("./manager");
const getGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getGroupByIDM)(req.params.id));
});
exports.getGroupByIDC = getGroupByIDC;
const deleteGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.deleteGroupByIDM)(req.params.id));
});
exports.deleteGroupByIDC = deleteGroupByIDC;
const createGroupC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.createGroupM)(req.params.name));
});
exports.createGroupC = createGroupC;
const updateGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.updateGroupByIDM)(req.body, req.params.id));
});
exports.updateGroupByIDC = updateGroupByIDC;
const getAllGroupsAndPeopleInGroupC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getAllGroupsAndPeopleInGroupM)(req.params.id));
});
exports.getAllGroupsAndPeopleInGroupC = getAllGroupsAndPeopleInGroupC;
const getPopulatedGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.populateGroups)());
});
exports.getPopulatedGroups = getPopulatedGroups;
//# sourceMappingURL=controller.js.map