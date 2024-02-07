const config = require("../../config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { ActivityType } = require("discord.js");
const client = global.client;
module.exports = () => {
client.user.setPresence({activities:[{name:`Element Özel Oda Sistemi!`,type: ActivityType.Playing}], status: "dnd" });
const kanal = client.channels.cache.get(config.voiceChannel);
if(!kanal)return
joinVoiceChannel({channelId: kanal.id,guildId: kanal.guild.id,adapterCreator: kanal.guild.voiceAdapterCreator,selfDeaf: true,selfMute:true});

const guild = client.guilds.cache.get(config.sunucuID)
setInterval(function(){
guild.channels.cache.forEach(async channel => {
if (channel.name.startsWith('#')) {
    let channeldata = client.db.get(`${channel.id}`)
    if(!channeldata)return;
    let member = guild.members.cache.get(channeldata)
    let data = client.db.get(`özeloda_${channeldata}`)
    if(!data)return;
    if (channel.members.size == 0) {
    channel.delete().catch(err=>{});
    if(client.db.has(`members_${channel.id}`))client.db.delete(`members_${channel.id}`)
    if(client.db.has(`özeloda_${channeldata}`))client.db.delete(`özeloda_${channeldata}`)
    if(client.db.has(`${channel.id}`))client.db.delete(`${channel.id}`)
    }
}
})
},config.odaSure)


}
module.exports.conf = {
name: "ready"
}
