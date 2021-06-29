exports.run = async(client, message) => {
    message.channel.send({
        embed: {
            title: 'Help',
            description: `
           play , nowplaying , lyrics , pause , play , volume , resume , skip , stop ,jumble, ping 

            
            `,
            color: '#4d4dff'
            
        }
    })
}
