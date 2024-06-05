require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { Client, Collection, } = require('discord.js');
const validation = require('./Utils/validation')();

const client = new Client({ intents: 131071 });
client.commands = new Collection();
client.events = new Collection();
client.validation = validation;

const handlers = fs.readdirSync(path.join(__dirname, 'handlers/').replace(/\\/g,"/"), { recursive: true }).filter((file) => file.endsWith('.js'));
handlers.forEach(async (handler) => await require(`./handlers/${handler.split('.')[0]}`)(client));

client.login(process.env['TOKEN']).then(() => {
    console.log(
        `Logged in as ${client.user.tag} (ID: ${client.user.id}).\n` +
        `Online for ${client.guilds.cache.size} server(s) and ${client.users.cache.size} user(s).\n`
    );
}); 