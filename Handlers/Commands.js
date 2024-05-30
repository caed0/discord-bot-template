const { Client } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = (client) => {

    /**
    * @param { Client } client 
    */

    const commandsDir = path.join(__dirname, '..', 'Commands/').replace(/\\/g,"/");
    const files = fs.readdirSync(commandsDir, { recursive: true }).filter((file) => file.endsWith('.js'));

    files.map(async (file) => {
        const command = require(path.join(commandsDir, file));
        if(!command.name || !command.description) return;
        if(command.permission) {
            if(client.validation.permissions.includes(command.permission)) command.defaultPermission = false;
            else return;
        }

        console.log(`Command Loader: ${command.name}.js ...`);
        await client.commands.set(command.name, command);
    });

    console.log(`Command Loader: ${client.commands.size} command(s) loaded!\n`);
}