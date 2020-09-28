import SpotifyWebAPI from 'spotify-web-api-js';
import { getUserData, refreshTokens } from './auth';
import AsyncStorage from '@react-native-community/async-storage';

export const USER_INFO = 'USER_INFO';

// Get Valid Spotify Obj
export const getValidSPObj = async () => {
	try {
		const userData = await AsyncStorage.getItem('userData');
		const transformedData = JSON.parse(userData);
		// const expirationTime = transformedData.expirationTime;
		// const expirationDate = new Date(expirationTime);
		// if (!expirationDate || expirationDate <= new Date()) {
		// 	await refreshTokens();
		// }
		const accessToken = transformedData.accessToken;
		
		var sp = new SpotifyWebAPI();
		await sp.setAccessToken(accessToken);
		return sp;
	
	} catch (err) {
		throw err;
	}
}


// Dispatch Handler
export const dispatchUser = () => {
	return async dispatch => {
		try {
			const user = await getUserInfo();
			const playlists = await getUserPlaylists();
			const following = await getFollowedArtists();
			const topArtists = await getTopArtists();

			dispatch({type: USER_INFO, user: user, playlists: playlists, following: following, topArtists: topArtists});

		} catch (err) {
			throw err;
		}
	}
}


// Get User
export const getUserInfo = async () => {
	try {
		const sp = await getValidSPObj();
		const user = await sp.getMe();
		return user;

	} catch (err) {
		
	}
};


// Get Followed Artists
export const getFollowedArtists = async () => {
	try {
		const sp = await getValidSPObj();
		const followedArtists = await sp.getFollowedArtists();
		return followedArtists;

	} catch (err) {
		throw err;
	}
}

// Get Users Recently Played Tracks


//Get a List of Current Users Playlists
export const getUserPlaylists = async () => {
	try {
		const sp = await getValidSPObj();
		const { id: userId } = await sp.getMe();
		const { items: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });
		return playlists;

	} catch (err) {
		
	}
}

// Get a Users Top Artists
export const getTopArtists = async () => {
	try {

		const sp = await getValidSPObj();
		const topArtists = await sp.getMyTopArtists({time_range: 'long_term'});
		//console.log(topArtists)
		return topArtists;

	} catch (error) {
		console.log(error);
	}
}

// Get a Users Top Tracks


