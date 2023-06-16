import { Track, loadTracks } from "./Track";



class MediaControls {

    playlist: Track[] = [];
    currentTrack: Track;
    currentTrackIdx = 0;

    constructor() {
        // load in audio
        this.playlist = loadTracks();
        this.currentTrack = this.playlist[0];
    }

    play() {
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

    currentTime(): string {
        const time = Math.round(this.playlist[this.currentTrackIdx].audio.currentTime)
        const min = Math.round(time / 60);
        const sec = time % 60;

        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    // mute() {
    //     this.playlist.forEach(track => track.audio.muted = true);
    // }

    // unmute() {
    //     this.playlist.forEach(track => track.audio.muted = false);
    // }

    private reset() {
        this.playlist[this.currentTrackIdx].audio.pause();
        this.playlist[this.currentTrackIdx].audio.currentTime = 0;
    }
}

export default MediaControls;