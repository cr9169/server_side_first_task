"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const groupRoute = express_1.default.Router();
groupRoute.get("/group/:id", controller_1.getGroupByIDC);
groupRoute.get("/group/All/:id", controller_1.getAllGroupsAndPeopleInGroupC);
groupRoute.delete("/group/:id", controller_1.deleteGroupByIDC);
groupRoute.post("/group/", controller_1.createGroupC);
groupRoute.post("/group/update/:id", controller_1.updateGroupByIDC);
exports.default = groupRoute;
//# sourceMappingURL=router.js.map