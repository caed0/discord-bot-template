const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");
const path = require("path");

/**
 * @param { Client } client 
 */

module.exports = async (client, PG) => {
    const commandsArray = [];

    (await PG(path.join(__dirname, "..", "Commands/*/*.js").replace(/\\/g,"/"))).map(async (file) => {
        const command = require(file);

        if(!command.name) return;
    
        if(!command.description) return;

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false
            else return;
        }

        await client.commands.set(command.name, command);
        commandsArray.push(command);
    });

    client.on('ready', async () => {
        for(const [key] of client.guilds.cache)
            await client.guilds.cache.get(key).commands.set(commandsArray);
    });
}