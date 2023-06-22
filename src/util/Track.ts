export interface Track {
    name: string;
    source: string;
    audio: HTMLAudioElement;
}

type TrackList = {
    [key: string]: string[];
};

// Cached list of tracks already loaded
export type TrackCache = Map<string, Track[]>;

// list of tracks in each category playlist
const TRACKS: TrackList = {
    chill: ["empty-minds", "Cozy-Place", "i-choose-you", "in-the-room-when-the-rain-pours", "lofi-beat-chill", "lofi-chill", "lofi-girl-dreams", "lofi-study", "messy-melody", "rain", "rain-and-nostalgia", "romantic-dinner", "soft-beat", "soothing-sunset", "street-food", "summer-background", "sunset-vibes", "watr-fluid", "wish-you-were-here"],
    jazz: ["coffee-chill-out", "vintage", "trumpet", "chill-night", "coding-night"],
    Pokemon: [],
}
//? helpers

// Shuffle array in place
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// takes icon and returns the playlist name
const iconPlaylistName = (icon: string): string => {
    switch (icon) {
        case "Nightlife":
            return "jazz"
        case "Pokemon":
        case "Piano":
        default:
            return "chill"
    }
}

function capitalizeFirstLetterOfEachWord(str: string) {
    return str.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// takes file name and returns the formatted track name
const formatTrackName = (fileName: string): string => {
    return capitalizeFirstLetterOfEachWord(fileName.replace(/-/g, " ").replace(/.mp3/g, ""));
}

export const loadTracks = (playlistName: string, cachedTracks: TrackCache) => {

    let playlist: Track[] = [];
    let trackNames: string[] = [];

    // select playlist tracks
    playlistName = iconPlaylistName(playlistName);
    trackNames = TRACKS[playlistName];

    // Get from cache if available
    if (cachedTracks.has(playlistName)) {
        let cachedPlaylist = cachedTracks.get(playlistName)!
        shuffleArray(cachedPlaylist)
        return cachedPlaylist;
    }

    // load in audio from playlist
    if (trackNames) {
        for (const trackName of trackNames) {
            playlist.push({
                name: formatTrackName(trackName),
                source: `${playlistName === 'pokemon' ? 'Mikel' : 'Pixabay'}`,
                audio: new Audio(`/audio/tracks/${playlistName}/${trackName}.mp3`)
            })
        }
    }
    // Save to cache
    shuffleArray(playlist)
    cachedTracks.set(playlistName, playlist);

    return playlist;
}
