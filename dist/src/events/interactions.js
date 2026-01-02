"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (interaction.isCommand()) {
            await interaction.deferReply();
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply('Esse comando não existe');
            }
            if (!command.testOnly) {
                const channelCommand = process.env["CHANNEL_COMMANDS"];
                if (!channelCommand) {
                    return interaction.followUp({ content: "Canal de comandos não configurado (CHANNEL_COMMANDS)." });
                }
                if (interaction.channelId !== channelCommand) {
                    return interaction.followUp({ content: `Favor executar o comando na sala de comandos <#${channelCommand}>` });
                }
            }
            await command.run({
                args: interaction.options,
                client,
                interaction: interaction,
            });
        }
    },
};
