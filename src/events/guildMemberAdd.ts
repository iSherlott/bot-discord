const Jimp = require("jimp");

import path from "path"
import fs from "fs"

import { Event } from "../interfaces";
import { request } from "../services/request"

async function createBanner(avatarURL: any, member: any) {
    return new Promise(async (res, rej) => {

        const assetsPath = path.join(__dirname, '../../..', "assets");

        let font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        let mask = await Jimp.read(`${assetsPath}/mask.png`);
        let background = await Jimp.read(`${assetsPath}/welcome.png`);

        if (avatarURL.endsWith("null")) {
            fs.writeFileSync(`./assets/${member.user.id}.png`, "")

            Jimp.read("./assets/noPhoto.jpg").then((avatarNull: any) => {
                avatarNull.resize(330, 330);
                mask.resize(330, 330);
                avatarNull.mask(mask);
                background.print(font, 30, 30, member.user.username);
                background.print(font, 790, 30, member.user.discriminator);
                background
                    .composite(avatarNull, 28, 115)
                    .write(`./assets/${member.user.id}.png`);
            }).then((e: any) => res(`./assets/${member.user.id}.png`))
        } else {
            fs.writeFileSync(`./assets/${member.user.id}.png`, "")

            Jimp.read(avatarURL).then((avatar: any) => {
                avatar.resize(330, 330);
                mask.resize(330, 330);
                avatar.mask(mask);
                background.print(font, 30, 30, member.user.username);
                background.print(font, 790, 30, member.user.discriminator);
                background.composite(avatar, 28, 115).write(`./assets/${member.user.id}.png`);
            }).then((e: any) => res(`./assets/${member.user.id}.png`))
        }
    });
}

export const event: Event = {
    name: 'guildMemberAdd',
    run: async (client, member) => {
        try {
            if (member.user.bot) return

            const channaldefaul = member.guild.systemChannelId;
            const channel = member.guild.channels.cache.get(channaldefaul)

            const role = member.guild.roles.cache.find((role: any) => role.name === "Member");

            const text = `Bem vindo a o lugar mais tóxico que já presenciou, sua jornada de anti-mimização começa lendo as <#995432241264082994>`

            if (channaldefaul) {
                const avatarURL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`;

                const welcome = await createBanner(avatarURL, member)

                channel.send({
                    content: `Ola <@${member.user.id}>, ${text}`,
                    files: [welcome]
                }).then(() => {
                    console.log(`New member ${member.user.username}`);

                    request("post", "user/register", {
                        id: member.user.id,
                        username: member.user.username,
                        tag: member.user.tag
                    })

                    fs.unlinkSync(`./assets/${member.user.id}.png`)
                })

            } else {
                console.log(`New member ${member.user.username}`);

                request("post", "user/register", {
                    id: member.user.id,
                    username: member.user.username,
                    tag: member.user.tag
                })
            }

            member.roles.add(role);
        } catch (error) {
            console.log(error);
        }
    }
}