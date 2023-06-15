export interface Track {
    name: string;
    artist: string;
    audio: HTMLAudioElement
}

const TRACKS = [
    "empty-minds", "watr-fluid"
]

// loads tracks from public into HTMLAudioElement
export const loadTracks = () => {
    let playlist: Track[] = [];
    for (const trackName of TRACKS) {
        playlist.push({
            name: trackName,
            artist: "Unknown",
            audio: new Audio(`/tracks/${trackName}.mp3`)
        })
    }
    return playlist;
}