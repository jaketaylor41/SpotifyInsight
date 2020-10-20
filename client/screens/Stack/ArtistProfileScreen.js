import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ArtistProfile from '../../components/ArtistProfile/ArtistProfile';
import { getTrackFeatures, getTrack, isFollowing, followArtist, unfollowArtist, dispatchUser } from '../../../store/actions/spotifyData';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import ArtistProfileList from '../../components/ArtistProfile/ArtistProfileList';
import { HeaderButton } from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { FontAwesome, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const ArtistProfileScreen = props => {

	const dispatch = useDispatch();
	const songs = useSelector(state => state.spotifyData.artistTopSongs);
	const selectedArtist = useSelector(state => state.spotifyData.artistInfo);
	const [isLoading, setIsLoading] = useState(null);
	const [following, setIsFollowing] = useState(false);
	const artistId = props.navigation.getParam('artistId');

	
	const checkFollowing = async () => {
		const data = await isFollowing(artistId);
		setIsFollowing(data[0]);
	}

	const followArtistHandler = async () => {
		setIsFollowing(s => !s);
	};
	
	
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			checkFollowing();
		};
		
		
		return () => {
			mounted = false;
		}
		
	}, [setIsFollowing]);


	const selectTrackHandler = async (id) => {
		await dispatch(getTrackFeatures(id));
		await dispatch(getTrack(id));
		props.navigation.navigate('Track');
	};


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}


		if (songs !== null) {
			return (
				<SafeAreaView style={styles.screen}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<ArtistProfile
							image={selectedArtist.images[0].url}
							name={selectedArtist.name}
							followers={selectedArtist.followers.total}
							genres={selectedArtist.genres}
							following={following}
							onPress={() => {
								followArtistHandler().then(() => {
									if (!following) {
										followArtist(artistId);
									}
									if (following) {
										unfollowArtist(artistId);
									}
								})
							}}
						/>
							<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginLeft: 12, marginTop: 20}}>
								{songs.tracks.map((item, i) => {
									return (
										<ArtistProfileList
											key={item.id}
											image={item.album.images[0].url}
											title={item.name}
											album={item.album.name}
											duration={item.duration_ms}
											onSelect={() => {
												selectTrackHandler(item.id);
											}}
										/>
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
	album: {
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