const { Events } = require("../Validation");
const { Client } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = (client) => {

    /**
    * @param { Client } client 
    */

    const eventsDir = path.join(__dirname, '..', 'Events/').replace(/\\/g,"/");
    const files = fs.readdirSync(eventsDir, { recursive: true }).filter((file) => file.endsWith('.js'));

    files.map((file) => {
        const event = require(path.join(eventsDir, file).replace(/\\/g,'/'));
        if(!Events.includes(event.name) || !event.name) return;
        if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));

        console.log(`Event Loader: ${event.name}.js ...`);
        client.events.set(event.name, event);
    });

    console.log(`Event Loader: ${client.events.size} event(s) loaded!\n`);
}