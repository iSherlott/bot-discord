import { request } from "../../services/request";
import { MessageEmbed } from 'discord.js';

import { Command } from "../../interfaces";

export const slash: Command = {
    name: 'allbook',
    description: 'Compra um pacote cartas colecionaveis no valor de 500 Sugar.',
    testOnly: false,
    run: async ({ interaction }) => {
        if (1+1==2) return interaction.followUp({ content: "Comando temporariamente desativado." });
        
        const result = await request('get', 'luckycard/allbook', {});

        const bookGenres = result["data"]['Nome do Book'];

        const genresList = bookGenres.map((genre: string) => `- ${genre}`).join('\n');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Todos os livros')
            .addFields(
                { name: 'Books', value: genresList, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Cada livro contem: 6[R], 3[SR], 1[UR]' });


        return interaction.followUp({ embeds: [embed] });
    },
};