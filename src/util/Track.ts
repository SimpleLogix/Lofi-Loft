export interface Track {
    name: string;
    audio: HTMLAudioElement;
}

type TrackList = {
    [key: string]: string[];
};

// Cached list of tracks already loaded
export type TrackCache = Map<string, Track[]>;

// list of tracks in each category playlist
const TRACKS: TrackList = {
    Piano: ["empty-minds"],
    Nightlife: ["coffee-chill-out"],
    Pokemon: [],
}

export const loadTracks = (playlistName: string, cachedTracks: TrackCache) => {

    let playlist: Track[] = [];
    let trackNames: string[] = [];
    // select playlist tracks
    if (playlistName === "Shuffle" || playlistName === "Pokemon") {
        //todo: shuffle
        trackNames = TRACKS["Piano"];
        playlistName = "Piano";
    }
    else {
        trackNames = TRACKS[playlistName];
    }

    // Get from cache if available
    if (cachedTracks.has(playlistName)) {
        console.log("returning")
        return cachedTracks.get(playlistName)!;
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

