"use strict";

exports.run = async (client, message, args) => {

    const data = client.economy.get(message.guild.id);
    if (!data.members[message.author.id]) {
        return message.channel.send("Vous n'êtes pas dans la base de donnée.");
    }
    
    const userdb = data.members[message.author.id];
    message.channel.send(`${message.author}, vous avez actuellement **${userdb.coin}** coin(s) dans votre compte. 💰`);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "money",
    category: "Economy",
    description: "Affiche l'argant que vous avez dans votre compte",
    usage: "money"
};
