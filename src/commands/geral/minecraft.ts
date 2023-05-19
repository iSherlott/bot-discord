import { MessageEmbed, MessageAttachment } from 'discord.js';

import { Command } from "../../interfaces";

import { channelCommand, modoDev, minecraft } from "../../config/settings.json"

export const slash: Command = {
    name: 'minecraft',
    description: 'obter os dados do servidor do mine.',
    testOnly: false,
    run: async ({ interaction }) => {
        if (interaction.channelId != channelCommand) return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` })

        const goodbyembed = new MessageEmbed()
            .setTitle("Happy Sugar Craft")
            .addFields(
                { name: 'baseURL', value: `${minecraft.baseURL}` },
                { name: 'version', value: `${minecraft.version}` }
            )
            .setTimestamp()
            .setFooter({ text: `Servidor em fase de desenvolvimento` })
            .setColor("#FF0000")

        interaction.followUp({ embeds: [goodbyembed] })
    },
}; 