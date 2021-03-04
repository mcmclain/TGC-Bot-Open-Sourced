require("dotenv").config();
exports.run = async (client, message, args) => {
  return message.channel.send({
    embed: {
      color: 7948427,
      description:
        `**Here are my commands:**\n` +
        `\`${process.env.prefix}help\` - Shows this list of commands.\n` +
        `\`${process.env.prefix}power\` - Show's Someone's power\n`,
      author: {
        icon_url: ``,
        name: `Help | Celestial Bot`,
      },
      timestamp: new Date(),
      footer: {
        icon_url: `https://media.discordapp.net/attachments/811041417945546764/813460259624321104/unknown.png`,
        text: `Success | TGC`,
      },
    },
  });
};
