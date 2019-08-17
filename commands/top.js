module.exports.run = (client, message) => {
    let guild = client.ranking.get(message.guild.id);
    const mapUers = Object.keys(guild.members).map(function(key, index) {
      return guild.members[key];
    });
    mapUers.sort((a,b) => (b.exptotal + b.exp) - (a.exptotal + a.exp));
    message.channel.send(`Meilleurs rangs du serveur | Nombres: \`${mapUers.length}\``, {
      embed:{
        title: `Vous êtes **${mapUers.map(y => y._id).indexOf(message.author.id) + 1}** et votre score et de **${guild.members[message.author.id].exp + guild.members[message.author.id].exptotal}**`,
        description: `${mapUers.map((r, i) => `**[${i + 1}]** • **Nom:** \`${message.guild.members.get(r._id) === undefined ? `Left Guild (ID: ${r._id})` : message.guild.members.get(r._id).user.username}\`\n**╚> Score:** \`${r.exp + r.exptotal}\``).slice(0, 10).join('\n')}`,
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
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "top",
  category: "Level",
  description: "Donne les meilleurs rangs du serveur.",
  usage: "top"
};
