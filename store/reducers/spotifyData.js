
import { USER_INFO } from '../actions/spotifyData';

const initialState = {
    user: null,
    image: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return {
                user: action.user,
                image: action.image
            };
        default:
            return state;
    }
}
