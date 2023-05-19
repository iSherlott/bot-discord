import { request } from "../../services/request";
import { Command } from "../../interfaces";

import { channelCommand } from "../../config/settings.json"

const sendMenssageDM = require("../../helpers/embed_DM_message_with_gif");

export const slash: Command = {
    name: 'roulette',
    description: 'Desconecta aleatoriamente um usuário do mesmo canal de voz que você. Custa 100 Sugar.',
    testOnly: false,
    run: async ({ client, interaction }) => {
        try {
            if (interaction.channelId != channelCommand) return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` })

            const coins = await request("get", `wallet/${interaction.user.id}`, {});

            if (coins["data"] < 100) return interaction.followUp({ content: `Será necessario 100 Sugar para efetuar esse comando.` })

            const member = interaction.member;
            const voiceChannel = member.voice.channel;

            if (!voiceChannel) {
                return interaction.followUp({ content: `Você precisa estar em um canal de voz para usar este comando.` });
            }

            const members = [...voiceChannel.members.values()];

            if (members.length === 1) {
                return interaction.followUp({ content: `Não há mais ninguém no canal de voz com você.` });
            }

            const target = members[Math.floor(Math.random() * members.length)];

            target.voice.setChannel(null);

            await request("put", `wallet/subcoin/${interaction.user.id}`, { "value": 100 });
            return interaction.followUp({ content: `${target.displayName} foi desconectado com sucesso.` });

        } catch (error) {
            console.log(error);

            return interaction.followUp({ content: `Internal Error` });
        }
    },
};
