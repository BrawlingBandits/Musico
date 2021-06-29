exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You should join a voice channel before using this command!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send(
      "what should i stop :(? No song is being played in the vc rn"
    )
    message.react('✅')
    queue.songs = []
    queue.connection.dispatcher.end('I have stopped the music ')
}