
import { USER_INFO, ARTIST, TRACK } from '../actions/spotifyData';

const initialState = {
    user: null,
    playlists: null,
    following: null,
    topArtists: null,
    topTracks: null,
    artistTopSongs: null,
    trackAnalysis: null,
    trackFeatures: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return {
                user: action.user,
                playlists: action.playlists,
                following: action.following,
                topArtists: action.topArtists,
                topTracks: action.topTracks
            };
        case ARTIST:
            return {
                ...state,
                topArtists: {...state.topArtists },
                artistTopSongs: action.artistTopSongs
            };
        case TRACK:
            return {
                ...state,
                trackFeatures: action.trackFeatures
            }
        default:
            return state;
    }
}
