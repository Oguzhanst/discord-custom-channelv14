const client = global.client;
const { ChannelType,PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json")
module.exports = async (oldState,newState) => {
let data = client.db.get(`özeloda_${newState.member.id}`)
if(newState.channelId == config.odaOlusturID){
    if(!data){
    let odaisim = newState.member.displayName.length > 10 ? newState.member.displayName.substring(0, 10).trim() + ".." : newState.member.displayName;
    newState.guild.channels.create({
        name: `#${odaisim}`,
        type: ChannelType.GuildVoice,
        parent: config.kategoriID,
        userLimit: 1,
        permissionOverwrites: [{id: newState.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }, 
        {
        id: newState.guild.id,
        deny: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async(x) => { 
    await newState.member.voice.setChannel(x.id).catch(err=>{});
    await client.db.set(`özeloda_${newState.member.id}`,x.id)
    await client.db.set(`${x.id}`,`${newState.member.id}`)
    await client.db.push(`members_${x.id}`,newState.member.id)
    }).catch(err=>{});
    }else{
    let channel = newState.guild.channels.cache.get(data);
    if(!channel)return;
    newState.member.voice.setChannel(channel.id);
    }
}

}
module.exports.conf = {
name: "voiceStateUpdate"
}
