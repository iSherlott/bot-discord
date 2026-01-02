import { Client, Collection, ApplicationCommandDataResolvable } from "discord.js"
import path from "path"
import { pathToFileURL } from "url"
import {
    Command, Event, RegisterCommandsOptions
} from "../interfaces";
import { readdirSync } from "fs"
import { Dotenv } from "../config/dotenv";

Dotenv();

class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();

    public config = process.env["CHANNEL_WELCOME"];

    public constructor() {
        super({
            intents: ["GUILDS", "GUILD_WEBHOOKS", "GUILD_MEMBERS", "GUILD_VOICE_STATES"],
            partials: ["CHANNEL", "GUILD_MEMBER", "USER", "MESSAGE"]
        })
    }

    private toFileImportUrl(filePath: string) {
        return pathToFileURL(filePath).href
    }

    async importFile(fileParh: string) {
        return (await import(this.toFileImportUrl(fileParh)))?.slash
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions, dir: string) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands)
            console.log(`Register success commands ${dir}`)
        } else {
            this.application?.commands.set(commands);
            console.log(`Register global success commands ${dir}`)
        }
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];

        const commandPath = path.join(__dirname, '..', "commands");

        readdirSync(commandPath).forEach((dir) => {

            const commands = readdirSync(path.join(commandPath, dir)).filter((file) => file);

            commands.forEach(async (file) => {
                const command: Command = await this.importFile(path.join(commandPath, dir, file))

                if (!command.name) return;

                this.commands.set(command.name, command);
                slashCommands.push(command);
            })

            this.on("ready", () => {
                this.registerCommands({
                    commands: slashCommands,
                    guildId: process.env["CHANNEL_DEVELOPMENT"]!,
                }, dir)
            })
        })
    }

    public async init() {
        this.login(process.env.TOKEN);
        this.registerModules();

        if (!process.env["CHANNEL_WELCOME"]) console.log("Welcome channel not found")
        if (!process.env["CHANNEL_DEVELOPMENT"]) console.log("Development channel not found")

        const eventPath = path.join(__dirname, "..", "events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(this.toFileImportUrl(path.join(eventPath, file)))
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this))
        })
    }
}

export default Bot