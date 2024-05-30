const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    
    /**
     * @param { CommandInteraction } interaction 
     * @param { Client } client 
     */
    
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if(!command) 
                return interaction.reply({ content: '⛔ An error occurred while running this command.', ephemeral: true });
            if(command.permission && !interaction.member.permissions.has(command.permission))
                return interaction.reply({ content: 'You do not have the required permission to use this command.', ephemeral: true })
            
            await command.execute(interaction, client);
        }
    }
}