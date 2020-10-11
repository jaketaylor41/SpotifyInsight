import SpotifyWebAPI from 'spotify-web-api-js';
import AsyncStorage from '@react-native-community/async-storage';
import { refreshTokens } from './auth';
import { useSelector } from 'react-redux';

export const USER_INFO = 'USER_INFO';
export const ARTIST_TOP = 'ARTIST_TOP';
export const ARTIST_INFO = 'ARTIST_INFO';
export const TRACK = 'TRACK';
export const PLAYLIST = 'PLAYLIST';
export const FEATURES = 'FEATURES';

// Get Valid Spotify Obj
const getValidSPObj = async () => {
	try {

		const userData = await AsyncStorage.getItem('userData');
		const transformedData = JSON.parse(userData);
		const accessToken = transformedData.accessToken;
		
		const sp = new SpotifyWebAPI();
		await sp.setAccessToken(accessToken);
		return sp;
	
	} catch (err) {
		return;
		//throw err;
	}
};


// Dispatch Handler
export const dispatchUser = () => {
	return async dispatch => {
		try {
			console.log('DISPATCHUSER')
			const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();

			dispatch({type: USER_INFO, user: user, playlists: playlists, following: followedArtists, topArtists: topArtists, topTracks: topTracks });

		} catch (err) {
			throw err;
		}
	}
};


// Get All User Info
export const getUserInfo = async () => {
	try {
		console.log('GETUSERINFO')
			const sp = await getValidSPObj();
			const user = await sp.getMe();

			// Get a List of Current Users Playlists
			const { id: userId } = await sp.getMe();
			const { items: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });

			// Get Followed Artists
			const followedArtists = await sp.getFollowedArtists({ limit: 50 });

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
			const artistInfo = await sp.getArtist(artistId);
			
			dispatch({type: ARTIST_INFO, artistInfo: artistInfo});

			return artistInfo;

		} catch (error) {
			console.log(error)
		}

	}
};

// Get Artist Top Tracks
export const getArtistTopTracks = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const artistTopSongs = await sp.getArtistTopTracks(id, 'US');


			dispatch({type: ARTIST_TOP, artistTopSongs: artistTopSongs});
			
		} catch (error) {
			console.log(error)
		}
	}
};

// Get Track Info
export const getTrack = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const trackInfo = await sp.getTrack(id);

			dispatch({type: TRACK, trackInfo: trackInfo});
			
		} catch (error) {
			console.log(error)
		}
	}
};

// Get Track Analysis
export const getTrackFeatures = (id) => {
	return async dispatch => {
		try {
			const sp = await getValidSPObj();
			const trackFeatures = await sp.getAudioFeaturesForTrack(id);

			dispatch({
				type: FEATURES,
				trackFeatures: trackFeatures
			});
			
		} catch (error) {
			console.log(error)
		}
	}
};

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
};

// Get All Time Top Artists for User
export const getAllTopArtists = async () => {
	try {
		const sp = await getValidSPObj();
		const allTopArtists = await sp.getMyTopArtists({limit: 50, time_range: 'long_term'});

		return allTopArtists;
		
	} catch (error) {
		console.log(error)
	}
};

// Get Top Artists for Last 6 Months
export const getMediumTopArtists = async () => {
	try {
		const sp = await getValidSPObj();
		const mediumTopArtists = await sp.getMyTopArtists({limit: 50, time_range: 'medium_term'});

		return mediumTopArtists;
		
	} catch (error) {
		console.log(error)
	}
};

// Get Top Artists for Last 4 Weeks
export const getShortTopArtists = async () => {
	try {
		const sp = await getValidSPObj();
		const shortTopArtists = await sp.getMyTopArtists({limit: 50, time_range: 'short_term'});

		return shortTopArtists;
		
	} catch (error) {
		console.log(error)
	}
};

//Get Top Tracks of All Time
export const getTopTracksLong = async () => {
	try {
		const sp = await getValidSPObj();
		const topTrackslong = await sp.getMyTopTracks({limit: 50, time_range: 'long_term'});

		return topTrackslong;
		
	} catch (error) {
		console.log(error)
	}
};

//Get Top Tracks for Last 6 Months
export const getTopTracksMedium = async () => {
	try {
		const sp = await getValidSPObj();
		const topTracksMedium = await sp.getMyTopTracks({limit: 50, time_range: 'medium_term'});

		return topTracksMedium;
		
	} catch (error) {
		console.log(error)
	}
};

//Get Top Tracks for Last 4 Weeks
export const getTopTracksShort = async () => {
	try {
		const sp = await getValidSPObj();
		const topTracksShort = await sp.getMyTopTracks({limit: 50, time_range: 'short_term'});

		return topTracksShort;
		
	} catch (error) {
		console.log(error)
	}
};

// Get Currently Playing Track for User
export const getCurrentlyPlaying = async () => {
	try {
		const sp = await getValidSPObj();
		const currentlyPlaying = await sp.getMyCurrentPlayingTrack();

		return currentlyPlaying;

	} catch (error) {
		console.log(error)
	}
};

// Get Recently Played Tracks for User
export const getRecentlyPlayed = async () => {
	try {
		const sp = await getValidSPObj();
		const recentlyPlayed = await sp.getMyRecentlyPlayedTracks();

		return recentlyPlayed;

	} catch (error) {
		console.log(error)
	}
};

// Get Users Available Devices
export const getDevices = async () => {
	try {
		const sp = await getValidSPObj();
		const devices = await sp.getMyDevices();

		return devices;

	} catch (error) {
		console.log(error)
	}
};

// Check if User Follows Artist
export const isFollowing = async (id) => {
	try {
		const sp = await getValidSPObj();
		const following = await sp.isFollowingArtists([id]);

		return following;

	} catch (error) {
		console.log(error)
	}
};

// Follow an Artist
export const followArtist = async (id) => {
	try {
		const sp = await getValidSPObj();
		const follow = await sp.followArtists([id]);

		return follow;

	} catch (error) {
		console.log(error)
	}
};

// Unfollow an Artist
export const unfollowArtist = async (id) => {
	try {
		const sp = await getValidSPObj();
		const unfollow = await sp.unfollowArtists([id]);

		return unfollow;

	} catch (error) {
		console.log(error)
	}
};


