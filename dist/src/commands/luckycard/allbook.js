"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
const discord_js_1 = require("discord.js");
exports.slash = {
    name: 'allbook',
    description: 'Compra um pacote cartas colecionaveis no valor de 500 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        const result = await (0, request_1.request)('get', 'luckycard/allbook', {});
        const bookGenres = result["data"]['Nome do Book'];
        const genresList = bookGenres.map((genre) => `- ${genre}`).join('\n');
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Todos os livros')
            .addFields({ name: 'Books', value: genresList, inline: true })
            .setTimestamp()
            .setFooter({ text: 'Cada livro contem: 6[R], 3[SR], 1[UR]' });
        return interaction.followUp({ embeds: [embed] });
    },
};
