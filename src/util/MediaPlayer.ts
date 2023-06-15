import { Track, loadTracks } from "./Track";



class MediaPlayer {

    playlist: Track[] = [];
    currentTrackIdx = 0;

    constructor() {
        // load in audio
        this.playlist = loadTracks();
    }

    play() {
        this.playlist[this.currentTrackIdx].audio.play();
    }

    pause() {
        this.playlist[this.currentTrackIdx].audio.pause();
        console.log(this.playlist[this.currentTrackIdx].audio.currentTime)
    }

    next() {
        console.log("next")
        this.reset()
        if (this.currentTrackIdx < this.playlist.length - 1) {
            this.currentTrackIdx++;
        } else {
            this.currentTrackIdx = 0; // loop
        }
        this.play();
    }

    prev() {
        console.log("prev")
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
            this.play();
        }
    }

    mute() {
        this.playlist.forEach(track => track.audio.muted = true);
    }

    unmute() {
        this.playlist.forEach(track => track.audio.muted = false);
    }

    private reset() {
        this.playlist[this.currentTrackIdx].audio.pause();
        this.playlist[this.currentTrackIdx].audio.currentTime = 0;
    }
}

export default MediaPlayer;