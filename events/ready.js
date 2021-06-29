module.exports = (client) => {
    console.log('Musico is ready to go! Pog')
    client.user.setPresence({ activity: { name: ';help' }, status: 'dnd' });
}