require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 131071 });

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);

client.commands = new Collection();
module.exports = client;

["Commands", "Events"].forEach(async (handler) => await require(`./Handlers/${handler}`)(client, PG));

client.login(process.env['TOKEN']).then(() => console.log(`Logged in as ${client.user.tag}`));