import { Client, Collection, ApplicationCommandDataResolvable } from "discord.js"
import settings from "../config/settings.json"
import path from "path"
import {
    Command, Event, RegisterCommandsOptions
} from "../interfaces";
import { readdirSync } from "fs"

class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config = settings.client["welcome"]
    public aliases: Collection<string, Command> = new Collection();

    public constructor() {
        super({
            intents: ["GUILDS", "GUILD_WEBHOOKS", "GUILD_MEMBERS", "GUILD_VOICE_STATES"],
            partials: ["CHANNEL", "GUILD_MEMBER", "USER", "MESSAGE"]
        })
    }

    async importFile(fileParh: string) {
        return (await import(fileParh))?.slash
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

            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file);

            commands.forEach(async (file) => {
                const command: Command = await this.importFile(`${commandPath}/${dir}/${file}`)

                if (!command.name) return;

                this.commands.set(command.name, command);
                slashCommands.push(command);
            })

            this.on("ready", () => {
                this.registerCommands({
                    commands: slashCommands,
                    guildId: `${settings.developers}`,
                }, dir)
            })
        })
    }

    public async init() {
        this.login(this.config.TOKEN)
        this.registerModules();

        if (!settings.developers) console.log("Server not found")

        const eventPath = path.join(__dirname, "..", "events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`)
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this))
        })
    }
}

export default Bot