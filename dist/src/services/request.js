"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const axios_1 = __importDefault(require("axios"));
const TOKEN = process.env.APIKEY || (() => { throw new Error("API Key is required"); })();
const URL = process.env.APIURL || (() => { throw new Error("API URL is required"); })();
async function request(method, tarjet, data) {
    let url = `${URL}/${tarjet}`;
    if (method == "get")
        url += `?${Object.keys(data)[0]}=${Object.values(data)[0]}`;
    const result = await (0, axios_1.default)({
        method: method,
        url: url,
        headers: {
            Authorization: TOKEN,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: data,
    });
    return result.data;
}
exports.request = request;
