import SpotifyWebAPI from 'spotify-web-api-js';
import { getUserData } from './auth';

export const USER_INFO = 'USER_INFO';

// Get Valid Spotify Obj
export const getValidSPObj = async () => {
    const tokenExpirationTime = await getUserData('expirationTime');
    if (new Date().getTime() > tokenExpirationTime) {
      // access token has expired, so we need to use the refresh token
      await refreshTokens();
    }
    const accessToken = await getUserData('accessToken');
    console.log(accessToken)
    var sp = new SpotifyWebAPI();
    await sp.setAccessToken(accessToken);
    return sp;
  }


// Get User
export const getUserInfo = () => {
    return async dispatch => {
    const sp = await getValidSPObj();
    // const spotifyApi = new SpotifyWebAPI();

		const user = await sp.getMe();
		dispatch({type: USER_INFO, user: user});
	}
};


// Get Followed Artists


// Get Users Recently Played Tracks


//Get a List of Current Users Playlists
// export const getUserPlaylists = () => {
    
// }

// Get a Users Top Artists


// Get a Users Top Tracks


