"use strict";

module.exports.run = (client, message, args) => {

    const search = args.slice(0)[0];

    let { member } = message;
    if (message.mentions.members.size > 0) {
        member = message.mentions.members.first();
    } else if (search) {
        member = client.findersUtil.findMember(message.guild, search);
        if (member.size === 0) {
            return message.channel.send(`<:warn:600349289427894272> Aucun membre n'a été trouvé avec: \`${search}\`!`);
        } else if (member.size === 1) {
            member = member.first();
        } else {
            return message.channel.send(client.findersUtil.formatMembers(client, member));
        }
    };

    const data = client.ranking.get(message.guild.id);
    if (!data.members[member.user.id]) {
        return message.channel.send(`**${member.user.username}** n'est pas dans la base de donnée.`);
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
    const userdb = data.members[member.user.id];
    message.channel.send({
        embed: {
            description: `${member.user.tag}\nLevel: ${userdb.level}\nXP: ${progressBar(userdb.exp, userdb.nextexp)}`,
            color: 0xEE6A8C,
            thumbnail: {
                url: member.user.displayAvatarURL
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
    category: "Level",
    description: "Donne votre niveau ou celui de la personne spécifier.",
    usage: "level (user)"
};
