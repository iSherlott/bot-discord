"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const discord_js_1 = require("discord.js");
const baseurl = process.env["MINECRAFT_BASEURL"] ?? "não configurado";
const version = process.env["MINECRAFT_VERSION"] ?? "não configurado";
exports.slash = {
    name: 'minecraft',
    description: 'obter os dados do servidor do mine.',
    testOnly: false,
    run: async ({ interaction }) => {
        const goodbyembed = new discord_js_1.MessageEmbed()
            .setTitle("Happy Sugar Craft")
            .addFields([
            { name: 'baseURL', value: baseurl },
            { name: 'version', value: version }
        ])
            .setTimestamp()
            .setFooter({ text: `Servidor em fase de desenvolvimento` })
            .setColor("#FF0000");
        interaction.followUp({ embeds: [goodbyembed] });
    },
};
