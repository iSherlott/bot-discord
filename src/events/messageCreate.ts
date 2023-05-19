import { Message, MessageEmbed, Permissions } from "discord.js"
import { Event } from "../interfaces"

export const event: Event = {
    name: "messageCreate",
    run: async (client, message: Message) => {
        if (message.channel.type === "DM") return;
        if (message.author.bot || !message.content.startsWith("!")) return;

        const args = message.content.slice(1).trim().split(" ");
        const cmd = args.shift()?.toLowerCase()

        message.reply("Hey!");
    }
}