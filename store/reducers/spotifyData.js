
import { USER_INFO } from '../actions/spotifyData';

const initialState = {
    user: null,
    playlists: null,
    following: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return {
                user: action.user,
                playlists: action.playlists,
                following: action.following,
                topArtists: action.topArtists
            };
        default:
            return state;
    }
}
