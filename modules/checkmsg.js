const Discord = require('discord.js');
const client = new Discord.Client();
const roblox = require('noblox.js');
const chalk = require('chalk');
const figlet = require('figlet');
const db = require("quick.db");
const https = require('https');

require('dotenv').config();


const checkmsg = async (rblxuser, userid, load) => {
    //TID Rank
    let mainrank = await roblox.getRankNameInGroup(6769220, userid);
    let mainrankid = await roblox.getRankInGroup(6769220, userid);
    //DSO Rank
    let dsorank = await roblox.getRankNameInGroup(process.env.dsoId, userid);
    let dsorankid = await roblox.getRankInGroup(process.env.dsoId, userid);
    //MOW Rank
    let mowrank = await roblox.getRankNameInGroup(process.env.mowId, userid);
    let mowrankid = await roblox.getRankInGroup(process.env.mowId, userid);
    //Join Date
    let info = await roblox.getPlayerInfo(userid);
    let joinDate = info.joinDate;

if(mainrankid == 0) mainrank = `Non-military Personel`;

if(dsorankid == 0 && mowrankid == 0) {
    await load.edit({embed: {
        color: 10038562,
        title: `Showing this Player's Identity`,
        fields: [{
            name: `Player`,
            value: `${rblxuser} (${userid})`
        },
        {
            name: `​`,
            value: `**About**`
        },
      {
          name: `Date Created`,
          value: `${joinDate}`
      },
      {
          name: `​`,
          value: `**Divisions**`
      },
      {
          name: `[TGC] The Galactic Coruscant`,
          value: `${mainrank} (${mainrankid})`,
          inline: true
      }
    
  ],

  thumbnail: {
      url: `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`,
  },
  footer: {
      icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,//it making sure the command author knows it suceess, there are some dumb onez out there
      text: `Success | the Imperial Demonation`,

  },
  timestamp: new Date(),
  author: {
      icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`, //Shttps://t2.rbxcdn.com/3a7462e4031b06642cc346b34bb9b356tating that this is the TID Bot and what Command its for. 
      name: `Check | TID Bot`,
  }

      }}) 
}

if(dsorankid >= 1 && mowrankid == 0) {
    await load.edit({embed: {
        color: 10038562,
        title: `Showing this Player's Identity`,
        fields: [{
            name: `Player`,
            value: `${rblxuser} (${userid})`
        },
        {
            name: `​`,
            value: `**About**`
        },
      {
          name: `Date Created`,
          value: `${joinDate}`
      },
      {
          name: `​`,
          value: `**Divisions**`
      },
      {
          name: `[TGC] The Galactic Coruscant`,
          value: `${mainrank} (${mainrankid})`,
          inline: true
      },
      {
          name: `[TGC] 501st Legion`,
          value: `${dsorank} (${dsorankid})`,
          inline: true

      }
  ],

  thumbnail: {
      url: `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`,
  },
  footer: {
      icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,//it making sure the command author knows it suceess, there are some dumb onez out there
      text: `Success | TGC`,

  },
  timestamp: new Date(),
  author: {
      icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`, //Stating that this is the TID Bot and what Command its for. 
      name: `Check | TGC Bot`,
  }

      }}) 
}
if(dsorankid == 0 && mowrankid >= 1) {
    await load.edit({embed: {
        color: 10038562,
        title: `Showing this Player's Identity`,
        fields: [{
            name: `Player`,
            value: `${rblxuser} (${userid})`
        },
        {
            name: `​`,
            value: `**About**`
        },
      {
          name: `Date Created`,
          value: `${joinDate}`
      },
      {
          name: `​`,
          value: `**Divisions**`
      },
      {
          name: `[TGC] The Galactic Coruscant`,
          value: `${mainrank} (${mainrankid})`,
          inline: true
      },
      {
          name: `[TGC] Republic Intelligence`,
          value: `${mowrank} (${mowrankid})`,
          inline: true

      }
  ],

  thumbnail: {
      url: `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`,
  },
  footer: {
      icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,//it making sure the command author knows it suceess, there are some dumb onez out there
      text: `Success | the Imperial Demonation`,

  },
  timestamp: new Date(),
  author: {
      icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`, //Stating that this is the TID Bot and what Command its for. 
      name: `Check | TID Bot`,
  }

      }}) 
}
if(dsorankid >= 1 && mowrankid >= 1) {
    await load.edit({embed: {
        color: 10038562,
        title: `Showing this Player's Identity`,
        fields: [{
            name: `Player`,
            value: `${rblxuser} (${userid})`
        },
        {
            name: `​`,
            value: `**About**`
        },
      {
          name: `Date Created`,
          value: `${joinDate}`
      },
      {
          name: `​`,
          value: `**Divisions**`
      },
      {
          name: `[TGC] The Galactic Coruscant`,
          value: `${mainrank} (${mainrankid})`,
          inline: true
      },
      {
          name: `[TGC] Republic Intelligence`,
          value: `${mowrank} (${mowrankid})`,
          inline: true
      },
      {
        name: `[TGC] 501st Legion`,
        value: `${dsorank} (${dsorankid})`,
        inline: true
    }
  ],

  thumbnail: {
      url: `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`,
  },
  footer: {
      icon_url: `https://images-ext-2.discordapp.net/external/pJ52xAFYjWy4YDMPcJwgrjvgkm2qyCMJ1Av6ir260io/https/0q0.eu/img/success.png`,//it making sure the command author knows it suceess, there are some dumb onez out there
      text: `Success | TGC`,

  },
  timestamp: new Date(),
  author: {
      icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`, //Stating that this is the TID Bot and what Command its for. 
      name: `Check | TGC Bot`,
  }

      }}) 
}
        
}

module.exports = checkmsg;
