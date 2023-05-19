import { request } from "../../services/request";
import { Command } from "../../interfaces";
import { channelCommand } from "../../config/settings.json"

export const slash: Command = {
    name: 'daily',
    description: 'Recebe 1x por dia o valor de 100 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        if (interaction.channelId != channelCommand) return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` })

        const result = await request("get", "wallet/verify/" + interaction.user.id, {})

        return interaction.followUp({ content: result["data"][0]["daily"] });
    },
}; 