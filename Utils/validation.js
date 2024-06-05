const { Events, Partials, PermissionsBitField } = require('discord.js');

module.exports = () => {
    const events = Object.values(Events);

    const partials = Object.values(Partials).filter(item => typeof item === 'number');

    const permissions = Object.keys(PermissionsBitField.Flags).map((permission) => {
        return permission.split('').map((char, index) => {
            if (char === char.toUpperCase() && index !== 0) return '_' + char;
            return char;
        }).join('').toUpperCase();
    });

    return { events: events, permissions: permissions};
}