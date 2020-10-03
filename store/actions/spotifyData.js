import SpotifyWebAPI from 'spotify-web-api-js';
import AsyncStorage from '@react-native-community/async-storage';
import { refreshTokens } from './auth';

export const USER_INFO = 'USER_INFO';
export const ARTIST = 'ARTIST';
export const TRACK = 'TRACK';
export const PLAYLIST = 'PLAYLIST';

// Get Valid Spotify Obj
export const getValidSPObj = async () => {
	try {
		const userData = await AsyncStorage.getItem('userData');
		const transformedData = JSON.parse(userData);
		const accessToken = transformedData.accessToken;
		
		const sp = new SpotifyWebAPI();
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
			
			const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();

			dispatch({type: USER_INFO, user: user, playlists: playlists, following: followedArtists, topArtists: topArtists, topTracks: topTracks });

		} catch (err) {
			throw err;
		}
	}
}


// Get All User Info
export const getUserInfo = async () => {
	try {
			const sp = await getValidSPObj();
			const user = await sp.getMe();

			// Get a List of Current Users Playlists
			const { id: userId } = await sp.getMe();
			const { items: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });

			// Get Followed Artists
			const followedArtists = await sp.getFollowedArtists();

			// Get a Users Top Artists
			const topArtists = await sp.getMyTopArtists({time_range: 'long_term'});

			// Get a Users Top Tracks
			const topTracks = await sp.getMyTopTracks({time_range: 'long_term'});

			return {
				user: user,
				playlists: playlists,
				followedArtists: followedArtists,
				topArtists: topArtists,
				topTracks: topTracks
			}

	} catch (err) {
		
	}
};

// Get an Artist
export const getArtist = (artistId) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const artist = await sp.getArtist(artistId);
			
			dispatch({type: ARTIST, artist: artist});

			return artist;

		} catch (error) {
			console.log(error)
		}

	}
}

// Get Artist Top Tracks
export const getArtistTopTracks = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const artistTopSongs = await sp.getArtistTopTracks(id, 'US');


			dispatch({type: ARTIST, artistTopSongs: artistTopSongs});
			
		} catch (error) {
			console.log(error)
		}
	}
}

// Get Track Info
export const getTrack = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const track = await sp.getTrack(id);


			dispatch({type: TRACK, track: track});
			
		} catch (error) {
			console.log(error)
		}
	}
}

// Get Track Analysis
export const getTrackFeatures = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const trackFeatures = await sp.getAudioFeaturesForTrack(id);

			dispatch({
				type: TRACK,
				trackFeatures: trackFeatures
			});
			
		} catch (error) {
			console.log(error)
		}
	}
}

// Get User Playlists
export const getPlaylist = (playlistId) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const playlist = await sp.getPlaylist(playlistId);

			dispatch({
				type: PLAYLIST,
				playlist: playlist
			});
			
		} catch (error) {
			console.log(error)
		}
	}
}
