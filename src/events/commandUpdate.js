const client = global.client;
const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json");
module.exports = async (oldMessage,newMessage) => {
if (config.prefix && !newMessage.content.startsWith(config.prefix)) return;
const args = newMessage.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const embed = new EmbedBuilder().setColor(`#2f3136`).setAuthor({name: newMessage.member.displayName, iconURL: newMessage.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: config.clientPresence ? config.clientPresence : `Özel Oda` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {
cmd.execute(client, newMessage, args, embed)} }
module.exports.conf = {name: "messageUpdate"}
