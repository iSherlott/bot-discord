import { request } from "../../services/request";
import { MessageAttachment, MessageEmbed } from 'discord.js';

import { Command } from "../../interfaces";

export const slash: Command = {
    name: 'buy',
    description: 'Compra um pacote cartas colecionaveis no valor de 500 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        if (1+1==2) return interaction.followUp({ content: "Comando temporariamente desativado." });
        
        const result = await request('get', 'luckycard/card', {});

        const cardInfo = result.data[0];

        const imagePath = `../assets/Book_${cardInfo["Nome do Book"]}/${cardInfo["URL da Card"]}`;

        const bookColors = await request('get', `luckycard/color/${cardInfo["Nome do Book"]}`, {});


        const embed = new MessageEmbed()
            .setTitle(`Parabéns: ${interaction.user.username}`)
            .setFooter({ text: `Book: ${cardInfo["Nome do Book"]} \nRaridade: ${cardInfo["Tipo de Raridade"]}` });

        if (bookColors["status"] == 200) embed.setColor(bookColors["data"]["color"]);
        else embed.setColor("#0099ff");

        const attachment = new MessageAttachment(imagePath, 'carta.png');
        embed.setImage(`attachment://carta.png`);

        return interaction.followUp({ embeds: [embed], files: [attachment] });
    },
};