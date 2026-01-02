"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request_1 = require("../services/request");
exports.event = {
    name: 'guildMemberRemove',
    run: async (client, id) => {
        try {
            const textByeBye = "Saiu do servidor porque deu para o dono e está com medo de admitir";
            const channaldefaul = id.guild.systemChannelId;
            const channel = id.guild.channels.cache.get(channaldefaul);
            const tarjet = id.toString().replace(/[>,<,@]/g, "");
            const assetsPath = path_1.default.join(__dirname, '../../..', "assets");
            await fs_1.default.readdir(`${assetsPath}/escape`, (err, paths) => {
                const x = Math.floor(Math.random() * paths.length);
                const attachment = new discord_js_1.MessageAttachment(`${assetsPath}/escape/${paths[x]}`, paths[x]);
                const goodbyembed = new discord_js_1.MessageEmbed()
                    .setAuthor({ name: id.user.username, iconURL: id.user.avatarURL({ dynamic: true, size: 512 }) })
                    .setDescription(`O <@${id.user.id}>, ${textByeBye}`)
                    .setColor("#FF0000")
                    .setImage(`attachment://${paths[x]}`);
                channel.send({ embeds: [goodbyembed], files: [attachment] }).then(() => {
                    console.log(`Member left ${id.user.username}`);
                    (0, request_1.request)("delete", "user/disable", {
                        id: id.user.id
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
