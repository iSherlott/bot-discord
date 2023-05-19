import { request } from "../../services/request";
import { Command } from "../../interfaces";

import { channelCommand } from "../../config/settings.json"

export const slash: Command = {
    name: 'wallet',
    description: 'Verifica o saldo da sua conta.',
    testOnly: false,
    run: async ({ interaction }) => {
        try {
            if (interaction.channelId != channelCommand) return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` })

            const coins = await request("get", `wallet/${interaction.user.id}`, {})

            return interaction.followUp({ content: `Seu saldo é de ${coins["data"]} Sugars` });
        } catch (error) {
            return interaction.followUp({ content: `Internal Error` })
        }
    },
}; 