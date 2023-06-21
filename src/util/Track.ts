export interface Track {
    name: string;
    audio: HTMLAudioElement;
}

type TrackList = {
    [key: string]: string[];
};

const TRACKS: TrackList = {
    Piano: ["empty-minds"],
    Nightlife: ["coffee-chill-out"],
    Pokemon: [],
}

// Cached list of tracks already loaded
type TrackCache = Map<string, Track[]>;


export const loadTracks = (playlistName: string, cachedTracks: TrackCache) => {
    // Get from cache if available
    if (cachedTracks.has(playlistName)) {
        return cachedTracks.get(playlistName)!;
    }

    let playlist: Track[] = [];
    let trackNames: string[] = [];
    // select playlist tracks
    console.log("loading")
    if (playlistName === "Shuffle" || playlistName === "Pokemon") {
        //todo: shuffle
        trackNames = TRACKS["Piano"];
        playlistName = "Piano";
    }
    else {
        trackNames = TRACKS[playlistName];
    }
    // load in audio from playlist
    if (trackNames) {
        for (const trackName of trackNames) {
            playlist.push({
                name: trackName,
                audio: new Audio(`/audio/tracks/${playlistName}/${trackName}.mp3`)
            })
        }
    }
    // Save to cache
    cachedTracks.set(playlistName, playlist);

    return playlist;
}

