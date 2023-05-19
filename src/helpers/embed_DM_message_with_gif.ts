const Discord = require("discord.js");
const fs = require("fs");

module.exports = (client: any, id: any, message: any, folder: any, color: any) => {
    fs.readdir(`./assets/${folder}`, (err: any, paths: any) => {
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
