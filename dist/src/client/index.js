"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const fs_1 = require("fs");
const dotenv_1 = require("../config/dotenv");
(0, dotenv_1.Dotenv)();
class Bot extends discord_js_1.Client {
    constructor() {
        super({
            intents: ["GUILDS", "GUILD_WEBHOOKS", "GUILD_MEMBERS", "GUILD_VOICE_STATES"],
            partials: ["CHANNEL", "GUILD_MEMBER", "USER", "MESSAGE"]
        });
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.config = process.env["CHANNEL_WELCOME"];
    }
    toFileImportUrl(filePath) {
        return (0, url_1.pathToFileURL)(filePath).href;
    }
    async importFile(fileParh) {
        return (await import(this.toFileImportUrl(fileParh)))?.slash;
    }
    async registerCommands({ commands, guildId }, dir) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Register success commands ${dir}`);
        }
        else {
            this.application?.commands.set(commands);
            console.log(`Register global success commands ${dir}`);
        }
    }
    async registerModules() {
        const slashCommands = [];
        const commandPath = path_1.default.join(__dirname, '..', "commands");
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            const commands = (0, fs_1.readdirSync)(path_1.default.join(commandPath, dir)).filter((file) => file);
            commands.forEach(async (file) => {
                const command = await this.importFile(path_1.default.join(commandPath, dir, file));
                if (!command.name)
                    return;
                this.commands.set(command.name, command);
                slashCommands.push(command);
            });
            this.on("ready", () => {
                this.registerCommands({
                    commands: slashCommands,
                    guildId: process.env["CHANNEL_DEVELOPMENT"],
                }, dir);
            });
        });
    }
    async init() {
        this.login(process.env.TOKEN);
        this.registerModules();
        if (!process.env["CHANNEL_WELCOME"])
            console.log("Welcome channel not found");
        if (!process.env["CHANNEL_DEVELOPMENT"])
            console.log("Development channel not found");
        const eventPath = path_1.default.join(__dirname, "..", "events");
        (0, fs_1.readdirSync)(eventPath).forEach(async (file) => {
            const { event } = await import(this.toFileImportUrl(path_1.default.join(eventPath, file)));
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}
exports.default = Bot;
