"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: "messageCreate",
    run: async (client, message) => {
        if (message.channel.type === "DM")
            return;
        if (message.author.bot || !message.content.startsWith("!"))
            return;
        const args = message.content.slice(1).trim().split(" ");
        const cmd = args.shift()?.toLowerCase();
        message.reply("Hey!");
    }
};
