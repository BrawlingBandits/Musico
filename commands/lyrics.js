const Discord = require("discord.js");
const findlyrics = require("lyrics-finder");

exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No song is playing right now").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await findlyrics(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}`;
    } catch (error) {
      lyrics = `A error occured while finding lyrics for  ${queue.songs[0].title}`;
    }

    let lyricsEmbed = new Discord.MessageEmbed()
      .setTitle(` ${queue.songs[0].title}'s Lyrics'`)
      .setDescription(lyrics)
      .setColor("#ff0066")
      .setFooter("Musico")

    if (lyricsEmbed.description.length >= 2000)
      lyricsEmbed.description = `Sorry but it looks like the lyrics are way to long`;
    return message.channel.send(lyricsEmbed).catch(message.channel.send("Uh Oh! Looks like a error occured in finding the lyrics."));
}
