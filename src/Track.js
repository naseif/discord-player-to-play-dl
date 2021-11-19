export class Track {
  title = null;
  url = null;
  thumbnail = {};
  duration = null;
  type = null;
  description = null;
  views = null;
  channel = {};
  private = null;

  constructor(tracks) {
    if (!tracks) throw new Error("Constructor was not initialized properly!");
    this.title = tracks.title || tracks.videos?.title;
    this.url = tracks.url || tracks.videos.url;
    this.thumbnail = {
      url: tracks?.thumbnail.url,
    };
    this.duration = tracks.durationInSec || tracks.videos?.durationInSec;
    this.type = tracks.type;
    this.description = tracks?.description || tracks.videos?.description;
    this.views = tracks?.views;
    this.channel = {
      name: tracks?.channel.name || tracks.videos?.channel.name,
      url: tracks?.channel.url || tracks.videos?.channel.url,
    };
    this.private = tracks?.private || tracks?.videos?.private || false;
  }
}
