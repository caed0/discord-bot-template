const { Client, Guild } = require('discord.js');

module.exports = {
    name: 'guildCreate',

    /**
     * @param { Client } client
     * @param { Guild } guild
     */

    async execute(client, guild) {
        await guild.commands.set(client.commandsArray);
    }
}