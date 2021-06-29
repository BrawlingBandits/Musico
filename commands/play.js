const ytdl = require('ytdl-core-discord');
const yt = require("scrape-yt");
const discord = require('discord.js')

//module.exports 
//all the user cases
    let channel = message.member.voice.channel;
    if(!args[0]) return message.channel.send('Gimme a song or a youtube video to play :C')
    if(!channel) return message.channel.send('You need to join a voice channel to play a music:O')

    if (!channel.permissionsFor(message.client.user).has("CONNECT")) return message.channel.send('I don\'t have permission to join the voice channel')
    if (!channel.permissionsFor(message.client.user).has("SPEAK"))return message.channel.send('I don\'t have permission to speak in the voice channel')

//get the song user wants and check for it's details
    const server = message.client.queue.get(message.guild.id);
    let video = await yt.search(args.join(' '))
    let result = video[0]

    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        uploadDate: result.uploadDate,
        views: result.viewCount,
        requestedBy: message.author,
        channel: result.channel.name,
        channelurl: result.channel.url
      };
//to check fot the song duration(copied this part)
    let date = new Date(0);
    date.setSeconds(song.duration); // specify value for SECONDS here fromm the song
    let timeString = date.toISOString().substr(11, 8);

      if (server) { //if a queue exists then it would add the song
        server.songs.push(song);

        let addtoque = new discord.MessageEmbed()
        .setTitle('Added to queue!')
        .setColor('#00ff00')
        .addField('Name', song.title, true)
        .setThumbnail(song.thumbnail)
        .addField('Views', song.views, true)
        .addField('Reqeusted By', song.requester, true)
        .addField('Duration', timeString, true)
        return message.channel.send(addtoque)
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);


    const play = async song => { //if there are no songs the user wants to play(in queue) then it would leave the vc
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
            queue.voiceChannel.leave();
            message.client.queue.delete(message.guild.id);
            message.channel.send('There are no songs in queue, I\'m leaving the voice channel!')
            return;
        }

        const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
            filter: format => ['251'],
            highWaterMark: 1 << 25
        }), {
            type: 'opus'
        })
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0]); // when the song is finished it plays the next song in queue
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 7);//default volume
        let onstartsong = new discord.MessageEmbed()
        .setTitle('Now Playing!')
        .setThumbnail(song.thumbnail)
        .addField('Name', song.title, true)
        .addField('Views', song.views, true)
        .addField('Duration', timeString, true)
        .setFooter('Requested By', song.requester, true )
        queue.textChannel.send(onstartsong);
    };


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`A error has occured while joining a vc`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`There was a error so i had to leave if this persists join my server  `);
    }
   