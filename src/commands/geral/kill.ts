import { request } from "../../services/request";
import { Command } from "../../interfaces";

import { channelCommand } from "../../config/settings.json"

const sendMenssageDM = require("../../helpers/embed_DM_message_with_gif");

export const slash: Command = {
    name: 'kill',
    description: 'Desconecta um usuário do servidor, Recomendo desconectar sempre que for necessário.',
    testOnly: false,
    options: [
        {
            name: 'target',
            description: 'O usuário que você deseja desconectar',
            type: 'USER',
            required: true,
        }
    ],
    run: async ({ client, interaction }) => {
        try {
            if (interaction.channelId != channelCommand) return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` })
            const target = interaction.options.getUser('target');

            if (!target) return interaction.followUp({ content: `Usuário não encontrado.` })

            const coins = await request("get", `wallet/${interaction.user.id}`, {});

            if (coins["data"] < 200) return interaction.followUp({ content: `Será necessario 200 Sugar para efetuar esse comando.` })

            const user = client.guilds.cache.map((e) => e.members.cache.get(target.id));

            if (!user[0]) {
                return interaction.followUp({ content: `Infelizmente o usuário não está em nenhuma call` });
            }

            try {
                if (user[0]!["voice"]["channelId"]) {
                    user[0]!["voice"].setChannel(null);

                    // sendMenssageDM(
                    //     client,
                    //     target.id,
                    //     `
                    //     Você foi desconectado pelo <@${interaction.user.id}>\n
                    //     Amamos você <3
                    //     `,
                    //     "disconnect",
                    //     "#B8B8F3"
                    // );

                    await request("put", `wallet/subcoin/${interaction.user.id}`, { "value": 200 });
                    return interaction.followUp({ content: `O usuário foi desconectado com sucesso.` });
                }
            } catch (error) {
                return interaction.followUp({ content: `O usuário foi desconectado com sucesso, só não consegui informa ele sobre o ocorrido.` });
            }

            return interaction.followUp({ content: `Unexpected Error` });
        } catch (error) {
            console.log(error);

            return interaction.followUp({ content: `Internal Error` });
        }
    },
};
