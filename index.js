require('dotenv').config();
const { Client, Collection, } = require('discord.js');

const client = new Client({ partials: [], intents: 131071 });
client.commands = new Collection();
client.events = new Collection();

["Commands", "Events"].forEach(async (handler) => await require(`./Handlers/${handler}`)(client));

client.login(process.env['TOKEN']).then(() => {
    console.log(
        `Logged in as ${client.user.tag} (ID: ${client.user.id}).\n` +
        `Online for ${client.guilds.cache.size} server(s) and ${client.users.cache.size} user(s).\n`
    );
}); 