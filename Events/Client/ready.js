const { Client } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    /**
     * @param { Client } client 
     */
    
    async execute(client) {
        for(const [key] of client.guilds.cache) await client.guilds.cache.get(key).commands.set(Array.from(client.commands.values()));
    }
}