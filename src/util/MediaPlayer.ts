import { Track, loadTracks } from "./Track";

const TRACKS = [
    "empty-minds.mp3",
]

class MediaPlayer {

    playlist: Track[] = [];
    currentTrack: Track;

    constructor() {
        for (const trackName of TRACKS) {
            this.playlist.push({
                name: trackName,
                artist: "Unknown",
                audio: new Audio(`/tracks/${trackName}`)
            })
        }
        this.currentTrack = this.playlist[0];
    }

    play() {
        console.log("playing")
        this.currentTrack.audio.play();
    }

    pause() {
        console.log("pausing")
    }

    next() {
        console.log("next")
    }

    prev() {
        console.log("prev")
    }
}


const playAudio = () => {
    console.log("playing")
    let audio = new Audio(`/tracks/empty-minds.mp3`);
    audio.play();
}

export default playAudio;;