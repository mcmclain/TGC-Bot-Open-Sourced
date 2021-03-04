// Must go to modules/checkmsg.js

const Discord = require('discord.js');
const client = new Discord.Client();
const roblox = require('noblox.js');
const chalk = require('chalk');
const figlet = require('figlet');
const db = require("quick.db");
const https = require('https');
const checkmsg = require('../modules/checkmsg.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    const load = await message.channel.send({embed: { //Allowing the User to Know that the command is working until the api gets the response.
        color: 7948427,
        description: `Loading... Please Wait a Couple Seconds\n This may take upto 10 seconds, please be patient.`,
        footer: {
            icon_url: `http://www.leadershipsaratoga.org/themes/leadership-saratoga-responsive/images/spinner.png`,
            text: `Loading | TGC`
        },
        timestamp: new Date(),
        author: {
            icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`,
            name: `Check | TGC Bot`
        }
    }});
    try {
        await roblox.getIdFromUsername(`${args[0]}`);
    } catch {
        return load.edit({embed: {
            color: 16733013,
            description: `Oops! An unexpected error has occured. Maybe the imput user is incorrect.`,
            footer: {
                icon_url: `https://images-ext-1.discordapp.net/external/LGvBIsduPKMp-ls0F7DfDuAX9orwqpdMSAAdkvErJG0/https/0q0.eu/img/error.png`,//it making sure the command author knows it suceess, there are some dumb onez out there
                text: `Error | TGC`,
    
            },
            timestamp: new Date(),
            author: {
                icon_url: `https://images-ext-1.discordapp.net/external/j7GUyG-9HGPeywJsNJawfIESo7UUSPsdtJUfJAJYz-I/https/t1.rbxcdn.com/60385337fbe7c1b86cae44a2d0d569eb`, //Stating that this is the TID Bot and what Command its for. 
                name: `Check | TGC Bot`,
            }

        }})
    }


    if(args[0] == null) {
        let author = message.author;
        let user = message.member;
        https
        .get(`https://verify.eryn.io/api/user/${author.id}`, response => {
            let data = "";
            response.on("data", chuck => {
                data += chuck;
            });
            response.on("end", () => {
                let rblxuser = JSON.parse(data).robloxUsername;
                let userid = JSON.parse(data).robloxId;
                
                
                checkmsg(rblxuser, userid, load);

            });

        })
        .on("error", (err) => {
            console.log(err);
        });
        

    }

    if(args[0]){
        let userid = await roblox.getIdFromUsername(`${args[0]}`);
        let rblxuser = await roblox.getUsernameFromId(`${userid}`);
        checkmsg(rblxuser, userid, load);
    }


}
