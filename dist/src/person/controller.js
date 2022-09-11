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
exports.getAllGroupsOfPersonC = exports.getPersonInGroupByNameC = exports.updatePersonByIDC = exports.createPersonC = exports.deletePersonByIDC = exports.getPersonByIDC = void 0;
const manager_1 = require("./manager");
const getPersonByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getPersonByIDM)(req.params.id));
});
exports.getPersonByIDC = getPersonByIDC;
const deletePersonByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.deletePersonByIDM)(req.params.id));
});
exports.deletePersonByIDC = deletePersonByIDC;
const createPersonC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.createPersonM)(req.body));
});
exports.createPersonC = createPersonC;
const updatePersonByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.updatePersonByIDM)(req.body, req.params.groupID));
});
exports.updatePersonByIDC = updatePersonByIDC;
const getPersonInGroupByNameC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getPersonInGroupByNameM)(req.params.name, req.params.groupID));
});
exports.getPersonInGroupByNameC = getPersonInGroupByNameC;
const getAllGroupsOfPersonC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getAllGroupsOfPersonM)(req.params.id));
});
exports.getAllGroupsOfPersonC = getAllGroupsOfPersonC;
//# sourceMappingURL=controller.js.map