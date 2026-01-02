"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
const sendMenssageDM = require("../../helpers/embed_DM_message_with_gif");
exports.slash = {
    name: 'roulette',
    description: 'Desconecta aleatoriamente um usuário do mesmo canal de voz que você. Custa 100 Sugar.',
    testOnly: false,
    run: async ({ client, interaction }) => {
        try {
            const coins = await (0, request_1.request)("get", `wallet/${interaction.user.id}`, {});
            if (coins["data"] < 100)
                return interaction.followUp({ content: `Será necessario 100 Sugar para efetuar esse comando.` });
            const member = interaction.member;
            const voiceChannel = member.voice.channel;
            if (!voiceChannel) {
                return interaction.followUp({ content: `Você precisa estar em um canal de voz para usar este comando.` });
            }
            const members = [...voiceChannel.members.values()];
            if (members.length === 1) {
                return interaction.followUp({ content: `Não há mais ninguém no canal de voz com você.` });
            }
            let target = members[Math.floor(Math.random() * members.length)];
            const ids = members.join(",").replace(/[<>@!]/g, "");
            await (0, request_1.request)("post", `rank/${ids}`, {});
            await (0, request_1.request)("put", `rank/${target.user.id}`, {});
            target.voice.setChannel(null);
            await (0, request_1.request)("put", `wallet/subcoin/${interaction.user.id}`, { "value": 100 });
            return interaction.followUp({ content: `${target.displayName} foi desconectado com sucesso.` });
        }
        catch (error) {
            console.log(error);
            return interaction.followUp({ content: `Internal Error` });
        }
    },
};
