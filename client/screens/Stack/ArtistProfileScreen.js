import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ArtistProfile from '../../components/ArtistProfile/ArtistProfile';
import { getArtistTopTracks } from '../../../store/actions/spotifyData';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';


const ArtistProfileScreen = props => {

	const artistId = props.navigation.getParam('artistId');
	const [isLoading, setIsLoading] = useState(false);
	const songs = useSelector(state => state.spotifyData.artistTopSongs);
	const selectedArtist = useSelector(state => 
		state.spotifyData.topArtists.items.find(artist => artist.id === artistId)
	);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const convertDuration = (ms) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}


		if (songs !== null) {
			return (
				<SafeAreaView style={styles.screen}>
					<ScrollView>
						<ArtistProfile
							image={selectedArtist.images[0].url}
							name={selectedArtist.name}
							followers={selectedArtist.followers.total}
							genres={selectedArtist.genres}
						/>
							<ScrollView contentContainerStyle={{marginLeft: 12, marginTop: 20}}>
								{songs.tracks.map((item, i) => {
									return (
										<View style={styles.topSong} key={i}>
											<View style={styles.trackImageContainer}>
												<Image style={styles.trackImage} source={{uri: item.album.images[0].url}} />
											</View>
											<View style={styles.trackTitleContainer}>
												<Text numberOfLines={2} ellipsizeMode='tail' style={styles.trackTitle}>{item.name}</Text>
												<Text style={styles.year}>Released {item.album.release_date.slice(0, 4)}</Text>
											</View>
											<View style={styles.durationContainer}>
												<Text style={styles.duration}>{convertDuration(item.duration_ms)}</Text>
											</View>
										</View>
									)
								})}
							</ScrollView>
					</ScrollView>
				</SafeAreaView>
	
			);
			
		}
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primaryBgColor,
		
	},
	topSong: {
		flexDirection: 'row',
		marginBottom: 15,
		
	},
	trackImageContainer: {
		width: 50,
		height: 50
	},
	trackImage: {
		width: '100%',
		height: '100%'
	},
	trackTitleContainer: {
		justifyContent: 'center',
		marginLeft: 10,
		width: '50%',
	},
	trackTitle: {
		color: '#fff',
		fontSize: 12,
		fontFamily: 'montserrat-semi-bold',
	},
	year: {
		color: '#fff',
		fontFamily: 'montserrat-regular',
		fontSize: 12
	},
	durationContainer: {
		width: '50%',
		marginLeft: 90
	},
	duration: {
		color: '#fff',
		fontFamily: 'montserrat-regular',
		fontSize: 12
	}



});


export default ArtistProfileScreen;