const { Events } = require("../Validation/EventNames");
const { Client } = require("discord.js");
const path = require("path");

/**
 * @param { Client } client
 * @param PG
 */

module.exports = async (client, PG) => {
    (await PG(path.join(__dirname, "..", "Events/*/*.js").replace(/\\/g,"/"))).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) return;

        if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
    });
}