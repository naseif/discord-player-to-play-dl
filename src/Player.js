const youtube = require("play-dl");
const { Queue } = require("./Queue");

class Player {
  constructor(client) {
    this.client = client;
    this.queues = new Map();
  }

  on(event, callback) {}
  async search(query, options) {
    const searchForQuery = await youtube.search(query, options);
    return {
      tracks: searchForQuery,
    };
  }

  createQueue(guild, options) {
    guild = this.client.guilds.resolve(guild);
    if (!guild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");

    if (this.queues.has(guild.id)) return this.queues.get(guild.id);

    const queue = new Queue(this, guild, options);
    this.queues.set(guild.id, queue);

    return queue;
  }

  async getQueue(guild) {
    guild = this.client.guilds.resolve(guild);
    if (!guild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");
    return this.queues.get(guild.id);
  }

  async deleteQueue(guild) {
    guild = this.client.guilds.resolve(guild);
    if (!guild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");
    const queue = this.getQueue(guild);

    try {
      queue.destroy();
    } catch {} // eslint-disable-line no-empty
    this.queues.delete(guild.id);

    return queue;
  }
}

module.exports = Player;
