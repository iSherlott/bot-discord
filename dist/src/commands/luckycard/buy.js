"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
const request_1 = require("../../services/request");
const discord_js_1 = require("discord.js");
exports.slash = {
    name: 'buy',
    description: 'Compra um pacote cartas colecionaveis no valor de 500 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        const result = await (0, request_1.request)('get', 'luckycard/card', {});
        const cardInfo = result.data[0];
        const imagePath = `../assets/Book_${cardInfo["Nome do Book"]}/${cardInfo["URL da Card"]}`;
        const bookColors = await (0, request_1.request)('get', `luckycard/color/${cardInfo["Nome do Book"]}`, {});
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Parabéns: ${interaction.user.username}`)
            .setFooter({ text: `Book: ${cardInfo["Nome do Book"]} \nRaridade: ${cardInfo["Tipo de Raridade"]}` });
        if (bookColors["status"] == 200)
            embed.setColor(bookColors["data"]["color"]);
        else
            embed.setColor("#0099ff");
        const attachment = new discord_js_1.MessageAttachment(imagePath, 'carta.png');
        embed.setImage(`attachment://carta.png`);
        return interaction.followUp({ embeds: [embed], files: [attachment] });
    },
};
