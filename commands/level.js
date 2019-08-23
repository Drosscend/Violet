"use strict";

const { Canvas } = require('canvas-constructor');
const axios = require('axios');


exports.run = async (client, message, args) => {

    function buffer(data) {
        return axios.get(data, {
            responseType: 'arraybuffer'
        })
            .then((res) => res.data)
            .catch(err => console.log(err));
    }

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
        for (i = 0; i < (100 * xp / xpMax) / 10 - 0.5; i++) {
            msg.push("▰");
        }
        for (let b = 0; b < 10 - i; b++) {
            msg.push("▱");
        }
        return msg.join("");
    }
    const userdb = data.members[member.user.id];

    let guild = client.ranking.get(message.guild.id);
    const mapUers = Object.keys(guild.members).map(function (key, index) {
        return guild.members[key];
    });
    mapUers.sort((a, b) => (b.exptotal + b.exp) - (a.exptotal + a.exp));

    async function Badge(data) {
        return new Canvas(800, 400)
            .save()
            .setColor('#181A1C')
            .addRect(0, 0, 800, 400)
            .setColor('#9B59B6')
            .addRect(0, 0, 40, 400)
            .addBeveledRect(50, 60, 700, 10, 5)
            .addBeveledRect(50, 340, 700, 10, 5)
            .addBeveledRect(360, 110, 360, 20, 10)
            .addBeveledImage(await buffer(member.user.displayAvatarURL), 50, 95, 220, 220, 6)
            .restore()
            .setColor("#c9a6d8")
            .addBeveledRect(360, 110, Math.round(360 * (userdb.exp / userdb.nextexp)), 20, 10)
            .setColor("white")
            .setTextFont('25pt sans serif')
            .addText('XP:', 300, 130, 285)
            .addText(`Niveau: ${userdb.level}`, 300, 190, 285)
            .addText(`Classement: ${mapUers.map(y => y._id).indexOf(message.author.id) + 1}`, 300, 250, 285)
            .addText(`Score: ${guild.members[message.author.id].exp + guild.members[message.author.id].exptotal}`, 300, 310, 285)
            .setTextAlign('center')
            .addResponsiveText(`Niveau de ${member.user.tag}`, 400, 40, 285)
            .toBuffer();
    }

    message.channel.send({
        files: [{
            attachment: await Badge(client),
            name: "level.png"
        }]
    }).catch((e) => {
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
        })
    })

}

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
