// import { yt_validate, search as _search, playlist_info } from "play-dl";
const play = require("play-dl");
const { Queue } = require("./Queue.js");
const { Track } = require("./Track.js");
// import { Queue } from "./Queue.js";
// import { Track } from "./Track.js";

class Player {
  /**
   * Discord.js CLient
   * @param {Client} client
   */
  constructor(client) {
    // if (!client)
    //   throw new Error(
    //     "Player can not be initialized without the discord Client!"
    //   );
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

  async search(query) {
    if (!query) throw new Error("No search query was provided!");
    const validate = play.yt_validate(query);
    if (!validate) throw new Error("This is not a valid search query!");

    let search, tracks;

    switch (validate) {
      case "video":
        search = await play.search(query);
        if (!search) throw new Error("This Track was not found!");
        tracks = search.map((track) => {
          return new Track(track);
        });
        break;
      case "playlist":
        const playlist = await play.playlist_info(query);
        if (!playlist) throw new Error("Playlist not found!");
        tracks = playlist.videos.map((track) => {
          return new Track(track);
        });
        break;
      case "search":
        search = await play.search(query);
        if (!search) throw new Error("No Song was found for this query!");
        tracks = search.map((track) => {
          return new Track(track);
        });
        break;
    }

    return tracks;
  }

  createQueue(guild, options = {}) {
    guild = this.client.guilds.resolve(guild);
    if (!guild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");

    if (this.queues.has(guild.id)) return this.queues.get(guild.id);

    const queue = new Queue(this, guild, options);
    this.queues.set(guild.id, queue);

    return queue;
  }

  async getQueue(guild) {
    if (!guild) throw new Error("You did not provide the guild object!");

    const resolveGuild = this.client.guilds.resolve(guild);
    if (!resolveGuild)
      throw new Error("Could not resolve guild! (Guild does not exist!)");
    return this.queues.get(guild.id);
  }

  async deleteQueue(guild) {
    if (!guild) throw new Error("You did not provide the guild object!");
    const resolveGuild = this.client.guilds.resolve(guild);
    if (!resolveGuild)
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
