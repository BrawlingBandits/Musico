exports.run = async(client, message) => {
    message.channel.send(`My ping is  ${Date.now() - message.createdTimestamp}ms.The API Latency is ${Math.round(client.ws.ping)}ms`);
  }
