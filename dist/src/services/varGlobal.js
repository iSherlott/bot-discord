"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VarcharGlobal {
    constructor() {
        this.TOKEN = process.env["API_KEY"] ?? "";
        if (this.TOKEN === "")
            throw new Error("API_KEY is not defined in environment variables");
    }
}
exports.default = new VarcharGlobal();
