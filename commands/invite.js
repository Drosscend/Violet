"use strict";

exports.run = async (client, message) => {

    message.channel.send({
        embed: {
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
            description: "Penssez que si je n'ai pas toute les permissions nécessaire je ne fonctionnerai pas bien ;).",
            fields: [
                {
                    name: "**Lien avec toute les permission nécessaire:**",
                    value: `[Clique ici](https://discordapp.com/oauth2/authorize/?permissions=2117463295&scope=bot&client_id=584819038560190466)`,
                }, {
                    name: "**Lien sans permission:**",
                    value: `[Clique ici](https://discordapp.com/oauth2/authorize?client_id=584819038560190466&scope=bot&permissions=0)`,
                }
            ]
        }
    })

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "Bot",
  description: "Affiche le lien d'invitation de Yui.",
  usage: "invite"
};
