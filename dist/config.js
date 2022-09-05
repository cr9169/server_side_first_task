"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uri = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 3000
};
exports.uri = "mongodb://0.0.0.0:27017";
//# sourceMappingURL=config.js.map