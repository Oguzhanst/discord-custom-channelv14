const { Partials, Client, Collection, GatewayIntentBits } = require("discord.js");
const client = global.client = new Client({fetchAllMembers:true,intents:Object.keys(GatewayIntentBits),partials:Object.values(Partials),ws:{version:"10"}});
const config = require("./config.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
const {JsonDatabase} = require("wio.db");
const db = client.db = new JsonDatabase({databasePath:"./database.json"});
readdir("./src/commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let prop = require(`./src/commands/${f}/` + file);
console.log(`🧮 [COMMANDS] ${prop.name} Yüklendi!`);
commands.set(prop.name, prop);
prop.aliases.forEach(alias => {aliases.set(alias, prop.name);});});});});});
readdir("./src/events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let prop = require(`./src/events/${file}`);
if (!prop.conf) return;
client.on(prop.conf.name, prop);
console.log(`📚 [EVENTS] ${prop.conf.name} Yüklendi!`);});});
const commands2 = client.commands2 = (global.commands2 = []);
readdir("./komutlar_user/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./komutlar_user/${file}`);
      client.commands2.push({name: props.name,type: props.type})
      console.log(`👌 [MENU] Menü Komut Yüklendi: ${props.name}`);
  });
});
client.on("ready", async () => {
    const rest = new REST({ version: "9" }).setToken(config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {body: client.commands2,});
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', (button) => {
  if (button.isUserContextMenuCommand()){
      try {
        readdir("./komutlar_user/", (err, files) => {
          if (err) throw err;
          files.forEach(async (f) => {
            const command = require(`./komutlar_user/${f}`);
            if (button.commandName.toLowerCase() === command.name.toLowerCase()) {return command.run(button);}
          });
        });
      } catch (err) {
        console.error(err);
      }}});
Collection.prototype.array = function() {return [...this.values()]}
client.login(config.token).then(() => console.log(`🟢 ${client.user.username} Başarıyla Giriş Yaptı!`)).catch((err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${err.message.includes("invalid token") ? "Token Hatalı Durumda, Bot Tokeninizi Kontrol Ediniz Veya Doğru Girdiğinizden Emin Olunuz" : err}`));

