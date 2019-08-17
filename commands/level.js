"use strict";

module.exports.run = (client, message) => {
    const data = client.ranking.get(message.guild.id);
    if (!data.members[message.author.id]) {
        return message.channel.send("Vous n'estes pas dans la base de donnée.");
    }
    function progressBar(xp, xpMax) {
        const msg = [];
        let i = 0;
        for(i = 0; i < (100 * xp / xpMax) / 10 - 0.5; i++) {
            msg.push("▰");
        }
        for(let b = 0; b < 10 - i; b++) {
            msg.push("▱");
        }
        return msg.join("");
    }
    const userdb = data.members[message.author.id];
    message.channel.send({
        embed: {
            description: `${message.author.tag}\nLevel: ${userdb.level}\nXP: ${progressBar(userdb.exp, userdb.nextexp)}`,
            color: 0xEE6A8C,
            thumbnail: {
                url: message.author.displayAvatarURL
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
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "level",
    category: "Niveau",
    description: "Donne votre niveau ou celui de la personne spécifier.",
    usage: "level (user)"
};
