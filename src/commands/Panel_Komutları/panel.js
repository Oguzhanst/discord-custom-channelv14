const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
name: "oda-panel",
aliases: ["panel"],
execute: async (client, message, args, embed) => {     

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji('🏷️')
            .setCustomId('oda-oluştur')
            .setLabel(`Oda Oluştur`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji('➕')
            .setCustomId('user-ekle')
            .setLabel(`User Ekle`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji('➖')
            .setCustomId('user-cıkar')
            .setLabel(`User Çıkar`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji('✍️')
            .setCustomId('oda-isim')
            .setLabel(`Oda Adı Değiştir`)
            .setStyle('Success'),
            new ButtonBuilder()
            .setEmoji('🆑')
            .setCustomId('oda-sil')
            .setLabel(`Odayı Sil`)
            .setStyle('Success'))

            const button2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji('🔒')
            .setCustomId('oda-kilit')
            .setLabel(`Odayı Kilitle`)
            .setStyle('Danger'),
            new ButtonBuilder()
            .setEmoji('📻')
            .setCustomId('oda-bit')
            .setLabel(`Bit Hızı Değiştir`)
            .setStyle('Danger'),
            new ButtonBuilder()
            .setEmoji('👥')
            .setCustomId('oda-limit')
            .setLabel(`Oda Limiti Değiştir`)
            .setStyle('Danger'),
            new ButtonBuilder()
            .setEmoji('👺')
            .setCustomId('sesten-at')
            .setLabel(`Sesten At`)
            .setStyle('Danger'),
            new ButtonBuilder()
            .setEmoji('🔓')
            .setCustomId('oda-herkes')
            .setLabel(`Odayı Herkese Aç`)
            .setStyle('Danger'))

            const button3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji('❓')
                    .setCustomId('oda-bilgi')
                    .setLabel(`Oda Bilgisi`)
                    .setStyle('Primary'))

message.channel.send({content:`> **Aşağıdaki Butonlar Üzerinden Özel Odanızı Oluşturabilir,**\n> **Düzenliyebilir Veya Diğer İşlemleri Gerçekleştirebilirsiniz!**`,components:[button,button2]})
message.channel.send({components:[button3]})
message.delete();



}}