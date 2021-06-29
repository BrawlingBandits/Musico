exports.run = async(client, message, args) => {
    /*const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('POV: You wanna ruin someone\'s vc experience, Join a vc to jumble up the songs');
    const queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send('There are no songs in queue to jumble')
    let songs = queue.songs;
    //suffle/jumble algorithem is not mine
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    message.channel.send(`The current queue has been jumbled 🔀`).catch(console.log(err));*/
    message.channel.send("Sorry but this command is being bugfixed right now !")
}
