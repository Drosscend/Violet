"use strict";

const logo = require('asciiart-logo');

module.exports = async client => {

  await console.log(
    logo({
      name: `${client.user.username}`,
      font: 'Basic',
      lineChars: 15,
      padding: 5,
      margin: 2
    })
    .render()
  );
  
  client.logger.log(`${client.user.tag} est prête à servir ${client.users.size -1} utilisateurs dans ${client.guilds.size} serveurs.`, "ready");

  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});

  //level
  client.guilds.filter(g => !client.ranking.has(g.id))
    .forEach((g) => {
      client.ranking.set(g.id, {
        members: {}
      });
      console.log(`[Database]["ranking"]: ${g.name} configuration added the database`);
    });
    //console.log(client.ranking);

  };
