"use strict";

exports.run = (client, message, args, level) => {
  
  if (!args[0]) {
    let embedFields = [];
    embedFields.push({
      name: `<:forbidden:600349288823783449> **Owner** (${client.commands.filter(filters => filters.help.category === "Owner").size} commandes)`,
      value: client.commands.filter(filters => filters.help.category === "Owner")
        .map(name => name.help.name).join(", "),
    });
    
    embedFields.push({
      name: `:robot: **Bot** (${client.commands.filter(filters => filters.help.category === "Bot").size} commandes)`,
      value: client.commands.filter(filters => filters.help.category === "Bot")
        .map(name => name.help.name).join(", "),
    });

    embedFields.push({
      name: `<:settings:600349289394470923> **Configuration** (${client.commands.filter(filters => filters.help.category === "Config").size} commandes)`,
      value: client.commands.filter(filters => filters.help.category === "Config")
        .map(name => name.help.name).join(", "),
    });

    embedFields.push({
      name: `<:browser1:600349429597470740> **Level** (${client.commands.filter(filters => filters.help.category === "Level").size} commandes)`,
      value: client.commands.filter(filters => filters.help.category === "Level")
        .map(name => name.help.name).join(", "),
    });


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
        timestamp: new Date(),
        description: `Utilisez \`${message.settings.prefix}help <command>\` pour plus de détails sur une commande. | ${client.commands.size} commandes.`,
        fields: embedFields,
      }
    });
  }
  if (args[0]) {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);

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
          description: `Description de la commande **${command.help.name}**`,
          timestamp: new Date(),
          fields: [{
            name: "**Description:**",
            value: `${command.help.description == 0 ? "Aucun usage définie" : command.help.description}`,
          }, {
            name: "**Usage:**",
            value: `${command.help.usage == 0 ? "Aucun usage définie" : command.help.usage}`,
          }, {
            name: "**Category:**",
            value: `${command.help.category}`,
            inline: true
          }, {
            name: "**Aliases:**",
            value: `${command.conf.aliases == 0 ? "Aucun" : command.conf.aliases}`,
            inline: true
          }, {
            name: "**Enabled:**",
            value: `${command.conf.enabled === true ? "<:online:600352893673013268> Oui" : "<:dnd:600352893450715146> Non"}`,
            inline: true
          }, {
            name: "**GuildOnly:**",
            value: `${command.conf.guildOnly}`,
            inline: true
          }, {
            name: "**Perm level:**",
            value: `${command.conf.permLevel}`,
            inline: true
          }]
        }
      });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "Bot",
  description: "Affiche toutes les commandes disponibles pour votre niveau d'autorisation.",
  usage: "help [commande]"
};
