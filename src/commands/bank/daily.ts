import { request } from "../../services/request";
import { Command } from "../../interfaces";

export const slash: Command = {
    name: 'daily',
    description: 'Recebe 1x por dia o valor de 100 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        if (1+1==2) return interaction.followUp({ content: "Comando temporariamente desativado." });

        const result = await request("get", "wallet/verify/" + interaction.user.id, {})

        return interaction.followUp({ content: result["data"][0]["daily"] });
    },
}; 