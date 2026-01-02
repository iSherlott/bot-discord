"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dotenv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Dotenv = () => {
    dotenv_1.default.config({ override: false });
    dotenv_1.default.config();
};
exports.Dotenv = Dotenv;
