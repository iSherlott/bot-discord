import { request } from "../../services/request";
import { Command } from "../../interfaces";

export const slash: Command = {
    name: 'wallet',
    description: 'Verifica o saldo da sua conta.',
    testOnly: false,
    run: async ({ interaction }) => {
        try {
            if (1+1==2) return interaction.followUp({ content: "Comando temporariamente desativado." });
            
            const coins = await request("get", `wallet/${interaction.user.id}`, {})

            return interaction.followUp({ content: `Seu saldo é de ${coins["data"]} Sugars` });
        } catch (error) {
            return interaction.followUp({ content: `Internal Error` })
        }
    },
}; 