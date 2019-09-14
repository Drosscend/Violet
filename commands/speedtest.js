"use strict";

exports.run = async (client, message) => {
    var speedTest = require('speedtest-net');
    var speed = speedTest();
    message.channel.send("Calcul en cours ...").then((msg) => {
        speed.on('data', async data => {

            msg.delete();

            message.channel.send({ embed: {
                title: "Ping en général",
                description: '⏲  Ping du bot ***' + ((new Date() - message.createdTimestamp) / 200).toFixed(0) + ' ms***\n💓 Ping de l\'API***' + Math.round(client.ping).toFixed(0) + '  ms***\n🖥Ping du serveur: ***' + data.server.ping + 'ms***\n:inbox_tray: Upload:***' + data.speeds.upload + '***\n:outbox_tray: Download:***' + data.speeds.download + '***',
                color: 0xEE6A8C,
                thumbnail: {
                    url: client.user.displayAvatarURL
                },
                author: {
                    name: message.author.username,
                    icon_url: message.author.displayAvatarURL
                },
                footer: {
                    icon_url: client.user.displayAvatarURL,
                    text: client.user.username
                },
            }})

        });
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["st"],
    permLevel: "User"
};

exports.help = {
    name: "speedtest",
    category: "Bot",
    description: "Donne le ping du bot, de l'api et du serveur vps ainsi que son upload et download.",
    usage: "speedtest"
};
