"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
const sendMenssageDM = require("../../helpers/embed_DM_message_with_gif");
exports.slash = {
    name: 'mute',
    description: 'Muta um usuário por 10 segundos. Custa 100 Sugar.',
    testOnly: false,
    options: [
        {
            name: 'target',
            description: 'O usuário que você deseja mutar',
            type: 'USER',
            required: true,
        }
    ],
    run: async ({ client, interaction }) => {
        try {
            const target = interaction.options.getUser('target');
            if (!target)
                return interaction.followUp({ content: `Usuário não encontrado.` });
            const coins = await (0, request_1.request)("get", `wallet/${interaction.user.id}`, {});
            if (coins["data"] < 100)
                return interaction.followUp({ content: `Será necessario 100 Sugar para efetuar esse comando.` });
            // Verify if guild exists before getting the member
            if (!interaction.guild) {
                return interaction.followUp({ content: `Este comando só pode ser usado dentro de um servidor.` });
            }
            const guildMemberTarget = interaction.guild.members.cache.get(target.id);
            if (!guildMemberTarget || !guildMemberTarget.voice.channel) {
                return interaction.followUp({ content: `O usuário precisa estar em um canal de voz para ser mutado.` });
            }
            // Checks if the user is already muted
            if (guildMemberTarget.voice.serverMute) {
                return interaction.followUp({ content: `O usuário já está mutado. Aguarde até que ele seja desmutado para usar este comando novamente.` });
            }
            try {
                guildMemberTarget.voice.setMute(true);
                setTimeout(() => {
                    guildMemberTarget.voice.setMute(false);
                }, 10000); // 10 seconds
                // sendMenssageDM(
                //     client,
                //     target.id,
                //     `
                //     Você foi mutado pelo <@${interaction.user.id}> por 10 segundos\n
                //     `,
                //     "disconnect",
                //     "#B8B8F3"
                // );
                await (0, request_1.request)("put", `wallet/subcoin/${interaction.user.id}`, { "value": 100 });
                return interaction.followUp({ content: `O usuário foi mutado por 10 segundos.` });
            }
            catch (error) {
                return interaction.followUp({ content: `O usuário foi mutado, mas não consegui informá-lo sobre o ocorrido.` });
            }
        }
        catch (error) {
            console.log(error);
            return interaction.followUp({ content: `Internal Error` });
        }
    },
};
