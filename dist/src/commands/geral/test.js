"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const discord_js_1 = require("discord.js");
const channelCommand = process.env["CHANNEL_COMMANDS"];
exports.slash = {
    name: 'test',
    description: 'comando de test.',
    testOnly: true,
    run: async ({ interaction }) => {
        const goodbyembed = new discord_js_1.MessageEmbed()
            .setTitle("O Q1 é viado!!!")
            .setTimestamp()
            .setFooter({ text: `Comando em desenvolvimento` })
            .setColor("#FF0000");
        interaction.followUp({ embeds: [goodbyembed] });
    },
};
