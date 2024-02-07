const client = global.client;
const config = require("../../config.json")
module.exports = async (oldState,newState) => {
if(!newState.channel)return;
let channel = client.guilds.cache.get(config.sunucuID).channels.cache.get(newState.channelId);
if(channel.parentId == config.kategoriID){
let data = client.db.get(`members_${newState.channel.id}`);
if(!data)return;
if(data.some(x => x.includes(newState.member.id)))return;
newState.member.voice.disconnect();
}else return
}
module.exports.conf = {
name: "voiceStateUpdate"
}
