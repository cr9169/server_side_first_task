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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroupsAndPeopleInGroupC = exports.updateGroupByIDC = exports.createGroupC = exports.deleteGroupByIDC = exports.getGroupByIDC = void 0;
const manager_1 = require("./manager");
const mongoose_1 = __importDefault(require("mongoose"));
const getGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getGroupByIDM)(new mongoose_1.default.Types.ObjectId((req.params.id))));
});
exports.getGroupByIDC = getGroupByIDC;
const deleteGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.deleteGroupByIDM)(new mongoose_1.default.Types.ObjectId((req.params.id))));
});
exports.deleteGroupByIDC = deleteGroupByIDC;
const createGroupC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.createGroupM)(req.body));
});
exports.createGroupC = createGroupC;
const updateGroupByIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.updateGroupByIDM)(req.body, new mongoose_1.default.Types.ObjectId((req.params.groupID))));
});
exports.updateGroupByIDC = updateGroupByIDC;
const getAllGroupsAndPeopleInGroupC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, manager_1.getAllGroupsAndPeopleInGroupM)(new mongoose_1.default.Types.ObjectId((req.params.id))));
});
exports.getAllGroupsAndPeopleInGroupC = getAllGroupsAndPeopleInGroupC;
//# sourceMappingURL=controller.js.map