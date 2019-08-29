"use strict";

exports.run = async (client, message, args) => {

    let guild = client.economy.get(message.guild.id);
    const mapUers = Object.keys(guild.members).map(function (key, index) {
        return guild.members[key];
    });
    mapUers.sort((a, b) => b.coin - a.coin);
    message.channel.send({
        embed: {
            title: `Vous êtes **${mapUers.map(y => y._id).indexOf(message.author.id) + 1}** et votre score et de **${guild.members[message.author.id].coin}** coin.`,
            description: `${mapUers.map((r, i) => `**[${i + 1}]** • **Nom:** \`${message.guild.members.get(r._id) === undefined ? `Guild quitté (ID: ${r._id})` : message.guild.members.get(r._id).user.username}\`\n**╚> Score:** \`${r.coin}\``).slice(0, 10).join('\n')}`,
            color: 0xEE6A8C,
            thumbnail: {
                url: message.guild.iconURL
            },
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL
            },
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
        }
    });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "test",
    category: "Economy",
    description: "Affiche l'argant que vous avez dans votre compte",
    usage: "money"
};
