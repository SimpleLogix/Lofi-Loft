export interface Track {
    name: string;
    audio: HTMLAudioElement;
}

const TRACKS = [
    "empty-minds", "coffee-chill-out"
]

// loads tracks from public into HTMLAudioElement
export const loadTracks = () => {
    let playlist: Track[] = [];
    for (const trackName of TRACKS) {
        playlist.push({
            name: trackName,
            audio: new Audio(`/audio/tracks/${trackName}.mp3`)
        })
    }

    return playlist;
}

