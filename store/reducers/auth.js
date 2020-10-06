
import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
    accessToken: null,
    refreshToken: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };
        case LOGOUT: 
            return initialState;
        default:
            return state;
    }
}
