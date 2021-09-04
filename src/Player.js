const youtube = require("play-dl");

class Player {
  constructor(client) {
    this.client = client;
  }
  on(event, callback) {}
  async search(query, options) {
    const searchForQuery = await youtube.search(query, options);
    return {
      tracks: searchForQuery,
    };
  }

  async createQueue(guild, options) {
    const guild = this.client.guilds.resolve(guild);
    if (!guild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");
  }
}

module.exports = Player;
