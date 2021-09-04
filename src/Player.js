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
}

module.exports = Player;
