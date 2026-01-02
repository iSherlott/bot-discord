import { MessageEmbed } from 'discord.js';

import { Command } from "../../interfaces";

const channelCommand = process.env["CHANNEL_COMMANDS"];

export const slash: Command = {
    name: 'test',
    description: 'comando de test.',
    testOnly: true,
    run: async ({ interaction }) => {

        const goodbyembed = new MessageEmbed()
            .setTitle("O Q1 é viado!!!")
            .setTimestamp()
            .setFooter({ text: `Comando em desenvolvimento` })
            .setColor("#FF0000")

        interaction.followUp({ embeds: [goodbyembed] })
    },
}; 