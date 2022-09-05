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
const config_1 = require("../config");
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./person/router"));
const router_2 = __importDefault(require("./group/router"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const errorHandler_1 = require("../errorHandler");
const app = (0, express_1.default)();
const PORT = config_1.config.SERVER_PORT;
const db = config_1.uri;
app.use(express_1.default.json());
app.use("/", router_1.default);
app.use("/", router_2.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Rute not found!");
});
app.use(errorHandler_1.errorHandler);
connect();
function connect() {
    mongoose_1.default
        .connect(db)
        .then(() => {
        console.log("Connected to db");
        app.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
            console.log("server is listening to port " + PORT);
        }));
    })
        .catch(() => {
        throw (0, http_errors_1.default)(501, "Unable to connect database");
    });
}
//# sourceMappingURL=server.js.map