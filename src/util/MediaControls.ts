import { Track, loadTracks } from "./Track";

type TrackCache = Map<string, Track[]>;

class MediaControls {

    playlistName: string = "Shuffle"
    playlist: Track[] = [];
    currentTrack: Track;
    currentTrackIdx = 0;
    volume = 50;
    cachedTracks: TrackCache;

    constructor(cache: TrackCache) {
        // load in sample audio
        this.currentTrack = {
            name: "empty-minds",
            source: "Pixabay",
            audio: new Audio(`/audio/tracks/chill/empty-minds.mp3`)
        }
        this.cachedTracks = cache;
    }

    changePlaylist(playlistName: string) {
        this.currentTrack.audio.pause();
        this.playlistName = playlistName;
        this.playlist = loadTracks(playlistName, this.cachedTracks);
        this.currentTrackIdx = 0;
        this.currentTrack = this.playlist[0];
    }

    play() {
        this.playlist[this.currentTrackIdx].audio.volume = this.volume / 100;
        this.playlist[this.currentTrackIdx].audio.play();
    }

    pause() {
        this.playlist[this.currentTrackIdx].audio.pause();
    }

    next() {
        this.reset()
        if (this.currentTrackIdx < this.playlist.length - 1) {
            this.currentTrackIdx++;
        } else {
            this.currentTrackIdx = 0; // loop
        }
        this.currentTrack = this.playlist[this.currentTrackIdx];
        this.play();
    }

    prev() {
        if (this.playlist[this.currentTrackIdx].audio.currentTime > 5) {
            this.playlist[this.currentTrackIdx].audio.currentTime = 0; // restart
        }
        else {
            this.reset()
            if (this.currentTrackIdx > 0) {
                this.currentTrackIdx--;
            } else {
                this.currentTrackIdx = this.playlist.length - 1; // loop
            }
            this.currentTrack = this.playlist[this.currentTrackIdx];
            return 0;
        }
    }

    setVolume(volume: number) {
        this.volume = volume;
    }

    // returns a formatted string of the current time [min:sec]
    currentTime(): string {
        const time = Math.round(this.playlist[this.currentTrackIdx].audio.currentTime)
        const min = Math.round(time / 60);
        const sec = time % 60;

        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    private reset() {
        this.playlist[this.currentTrackIdx].audio.pause();
        this.playlist[this.currentTrackIdx].audio.currentTime = 0;
    }
}

export default MediaControls;