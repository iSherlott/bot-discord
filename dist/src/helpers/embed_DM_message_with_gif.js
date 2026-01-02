"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const fs = require("fs");
module.exports = (client, id, message, folder, color) => {
    fs.readdir(`./assets/${folder}`, (err, paths) => {
        const number = Math.floor(Math.random() * paths.length);
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle("Amamos você Aslan <3")
            .setImage(`attachment://${paths[number]}`);
        const attachment = fs.readFileSync(`./assets/${folder}/${paths[number]}`);
        client.users.cache.get(id).send(message);
        client.users.cache.get(id).send({ files: [{ attachment: attachment, name: paths[number] }], embed });
    });
};
