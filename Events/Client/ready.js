const { Client } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    /**
     * @param { Client } client 
     */

    async execute(client) {
        for(const [key] of client.guilds.cache) {
            const commands = (await client.guilds.cache.get(key).commands.fetch()).map((command) => command.name);
            if(JSON.stringify(commands) !== JSON.stringify(Array.from(client.commands.keys())))
                await client.guilds.cache.get(key).commands.set(Array.from(client.commands.values()));
        }
    }
}