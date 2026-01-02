import { MessageEmbed, MessageAttachment } from 'discord.js';

import { Event } from "../interfaces";

import fs from "fs"
import path from "path"
import { request } from '../services/request';

export const event: Event = {
    name: 'guildMemberRemove',
    run: async (client, id) => {
        try {
            const textByeBye = "Saiu do servidor porque deu para o dono e está com medo de admitir"

            const channaldefaul = id.guild.systemChannelId;
            const channel = id.guild.channels.cache.get(channaldefaul)

            const tarjet = id.toString().replace(/[>,<,@]/g, "")

            const assetsPath = path.join(__dirname, '../../..', "assets");

            await fs.readdir(`${assetsPath}/escape`, (err: any, paths: any) => {

                const x = Math.floor(Math.random() * paths.length);

                const attachment = new MessageAttachment(
                    `${assetsPath}/escape/${paths[x]}`,
                    paths[x]
                );

                const goodbyembed = new MessageEmbed()
                    .setAuthor({ name: id.user.username, iconURL: id.user.avatarURL({ dynamic: true, size: 512 }) })
                    .setDescription(`O <@${id.user.id}>, ${textByeBye}`)
                    .setColor("#FF0000")
                    .setImage(`attachment://${paths[x]}`);

                channel.send({ embeds: [goodbyembed], files: [attachment] }).then(() => {
                    console.log(`Member left ${id.user.username}`);

                    // Comando temporariamente desativado.
                    // request("delete", "user/disable", {
                    //     id: id.user.id
                    // })
                })
            })
        } catch (error) {
            console.log(error);
        }

    }
}