const Discord = require("discord.js");
const client = new Discord.Client();
const roblox = require("noblox.js");
const chalk = require("chalk");
const figlet = require("figlet");
const db = require("quick.db");
const https = require("https");

require("dotenv").config();
const fs = require("fs");
const e = require("express");

exports.run = async (client, message, args) => {
  const load = await message.channel.send({
    embed: {
      color: 9240450,
      description: `Loading... Please Wait a Couple Seconds\n This may take upto 15 seconds, please be patient.,`,
      footer: {
        icon_url: `http://www.leadershipsaratoga.org/themes/leadership-saratoga-responsive/images/spinner.png`,
        text: `Loading | Clan Celestial`,
      },
      timestamp: new Date(),
      author: {
        icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
        name: `bounties | Celestial Bot`,
      },
    },
  });
  const amt = args[2];
  if (args[0] == null) {
    let author = message.author;
    let user = message.member;
    https
      .get(`https://Verify.eryn.io/api/user/${author.id}`, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          let rblxuser = JSON.parse(data).robloxUsername;
          let userid = JSON.parse(data).robloxId;

          let bountiesmsg = async () => {
            let bounties = await db.fetch(`bounties_${rblxuser}`);
            let rankid = await roblox.getRankInGroup(
              process.env.groupId,
              userid
            );
            let rank = await roblox.getRankNameInGroup(
              process.env.groupId,
              userid
            );
            if (bounties == null) bounties = 0;
            if (rank == "Guest") rank = "Non-Military Personnel";
            await load.edit({
              embed: {
                color: 9240450,
                fields: [
                  {
                    inline: false,
                    name: "**USERNAME**",
                    value: `${rblxuser}`,
                  },
                  {
                    inline: true,
                    name: "**bounties**",
                    value: `${bounties}`,
                  },
                  {
                    inline: true,
                    name: "**Rank**",
                    value: `${rank} (${rankid})`,
                  },
                ],
                thumbnail: {
                  url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${rblxuser}`,
                },
                footer: {
                  icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,
                  text: `Success | Clan Celestial`,
                },
                timestamp: new Date(),
                author: {
                  icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
                  name: `bounties | Celestial Bot`,
                },
              },
            });
          };
          bountiesmsg();
        });
      })
      .on("error", (err) => {
        console.log(err);
      });
  }
  if (args[0] && args[1] == null) {
    let userid = await roblox.getIdFromUsername(`${args[0]}`);
    let rblxuser = await roblox.getUsernameFromId(`${userid}`);

    let bounties = db.fetch(`bounties_${rblxuser}`);
    let rankid = await roblox.getRankInGroup(process.env.groupId, userid);
    let rank = await roblox.getRankNameInGroup(process.env.groupId, userid);
    if (bounties == null) bounties = 0;
    if (rank == "Guest") rank = "Non-Military Personnel";
    await load.edit({
      embed: {
        color: 9240450,
        fields: [
          {
            inline: false,
            name: "**USERNAME**",
            value: `${rblxuser}`,
          },
          {
            inline: true,
            name: "**bounties**",
            value: `${bounties}`,
          },
          {
            inline: true,
            name: "**Rank**",
            value: `${rank} (${rankid})`,
          },
        ],
        thumbnail: {
          url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${rblxuser}`,
        },
        footer: {
          icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,
          text: `Success | Clan Celestial`,
        },
        timestamp: new Date(),
        author: {
          icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
          name: `bounties | Celestial Bot`,
        },
      },
    });
  }
  if (args[1] == `add` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Points Adding Permission"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://images-ext-1.discordapp.net/external/LGvBIsduPKMp-ls0F7DfDuAX9orwqpdMSAAdkvErJG0/https/0q0.eu/img/error.png`,
            text: `Error | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bot`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let bounties = db.fetch(`bounties_${rblxuser}`);
      if (bounties == null) power = 0;
      db.set(`bounties_${rblxuser}`, Number(bounties) + Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully added **${amt}** bounties to ${rblxuser}`,
          footer: {
            icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,
            text: `Success | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bot`,
          },
        },
      });
    }
  }
  if (args[1] == `remove` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Points Adding Permission"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://images-ext-1.discordapp.net/external/LGvBIsduPKMp-ls0F7DfDuAX9orwqpdMSAAdkvErJG0/https/0q0.eu/img/error.png`,
            text: `Error | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bot`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let bounties = db.fetch(`bounties_${rblxuser}`);
      if (bounties == null) power = 0;
      db.set(`bounties_${rblxuser}`, Number(bounties) - Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully removed **${amt}** bounties from ${rblxuser}`,
          footer: {
            icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,
            text: `Success | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bot`,
          },
        },
      });
    }
  }
  if (args[1] == `change` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Points Adding Permission"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://images-ext-1.discordapp.net/external/LGvBIsduPKMp-ls0F7DfDuAX9orwqpdMSAAdkvErJG0/https/0q0.eu/img/error.png`,
            text: `Error | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bot`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let bounties = db.fetch(`bounties_${rblxuser}`);
      if (bounties == null) power = 0;
      db.set(`bounties_${rblxuser}`, Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully changed ${rblxuser}'s bounties from ${bounties} to ${amt}`,
          footer: {
            icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,
            text: `Success | Clan Celestial`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
            name: `bounties | Celestial Bott`,
          },
        },
      });
    }
  }
};
