const { Client, Guild } = require('discord.js');

module.exports = {
    name: 'guildCreate',

    /**
    * @param { Guild } guild
    * @param { Client } client
    */

    async execute(guild, client) {
        await guild.commands.set(Array.from(client.commands.values()));
    }
}