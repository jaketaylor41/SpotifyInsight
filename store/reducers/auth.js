
import { LOGIN } from '../actions/auth';

const initialState = {
    accessToken: null,
    refreshToken: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };
            default:
                return state;
    }
}
