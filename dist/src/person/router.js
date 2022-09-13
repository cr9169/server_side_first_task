"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const personRoute = express_1.default.Router();
personRoute.get("/person/:id", controller_1.getPersonByIDC);
personRoute.get("/person/:name/:id", controller_1.getPersonInGroupByNameC);
personRoute.get("/person/All/groups/:id", controller_1.getAllGroupsOfPersonC);
personRoute.get("person/populated", controller_1.getPopulatedPeople);
personRoute.delete("/person/:id", controller_1.deletePersonByIDC);
personRoute.post("/person/", controller_1.createPersonC);
personRoute.post("/person/update/:id", controller_1.updatePersonByIDC);
exports.default = personRoute;
//# sourceMappingURL=router.js.map