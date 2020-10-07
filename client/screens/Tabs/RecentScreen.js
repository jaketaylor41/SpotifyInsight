import React, { useState, useEffect, useCallback, useRef } from 'react';

import { getRecentlyPlayed, getCurrentlyPlaying, getTrackFeatures, getTrack } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecentList from '../../components/RecentScreen/RecentList';
import RecentListHeader from '../../components/RecentScreen/RecentListHeader';


const RecentScreen = props => {

	const [isLoading, setIsLoading] = useState(false);
	const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
	const [recent, setRecent] = useState(null);
	const [nowPlaying, setNowPlaying] = useState(false);
	const prev = previousTrack(currentlyPlaying);
	const dispatch = useDispatch();


	useEffect(() => {
		console.log('Recent Screen Mounted')
		setIsLoading(true);
		getData().then(() => {
			setIsLoading(false);
		});
		setIsLoading(true);
		loadCurrent().then(() => {
			setIsLoading(false);
		});

	}, [dispatch, loadCurrent]);

	useEffect(() => {
	const checkForNew = () => {
		if (prev !== currentlyPlaying) {
		clearInterval(timer);
		let timer = setInterval(() => {
			setNowPlaying(false);
				loadCurrent().then(() => {
					setNowPlaying(true);
				});
			}, 1000);
		}
	};

	checkForNew();

	}, [prev]);

	const selectTrackHandler = async (id) => {
		await dispatch(getTrackFeatures(id));
		await dispatch(getTrack(id));
		props.navigation.navigate('Track');
	};



	function previousTrack(value) {
		const currentlyPlayingRef = useRef();
		useEffect(() => {
			currentlyPlayingRef.current = value;
		}, [value]);
		return currentlyPlayingRef;
	}



	const loadCurrent = async () => {
		const current = await getCurrentlyPlaying();
		setCurrentlyPlaying(current);
	}

	const getData = async () => {
		const recentlyPlayed = await getRecentlyPlayed();
		setRecent(recentlyPlayed);
	}


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	let playing = null;

	if (currentlyPlaying) {
		playing = (
			<RecentListHeader
					key={currentlyPlaying.item.id}
					currentlyPlayingImg={currentlyPlaying.item.album.images[0].url}
					title={currentlyPlaying.item.name}
					artist={currentlyPlaying.item.artists[0].name}
				/>
		);
	}

    return (
			<SafeAreaView style={styles.screen}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginLeft: 12, marginRight: 12}}>
					{playing}
					<View style={currentlyPlaying ? styles.sectionTitleContainerShow : styles.sectionTitleContainerHide}>
						<Text style={styles.sectionTitle}>Recently Played</Text>
					</View>
					{recent ? 
						recent.items.map((item, index) => {
							return (
								<RecentList
									key={index}
									image={item.track.album.images[0].url}
									title={item.track.name}
									album={item.track.album.name}
									duration={item.track.duration_ms}
									onSelect={() => {
										selectTrackHandler(item.track.id)
									}}
								/>
							);
						})
					: <View style={styles.centered}>
							<ActivityIndicator size="small" />
						</View>}
				</ScrollView>
			</SafeAreaView>
    );

};


const styles = StyleSheet.create({
    screen: {
				flex: 1,
				backgroundColor: Colors.primaryBgColor
    },
		centered: { 
				flex: 1, 
				justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primaryBgColor
    },
		sectionTitleContainerShow: {
			marginBottom: 20
		},
		sectionTitleContainerHide: {
			marginTop: 30,
			marginBottom: 20
		},
		sectionTitle: {
			color: '#fff',
			fontSize: 25,
			fontFamily: 'montserrat-bold',
			textAlign: 'center'
		}
});


export default RecentScreen;