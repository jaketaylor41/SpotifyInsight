import React, { useState, useEffect, useCallback } from 'react';
import { refreshTokens } from '../../../store/actions/auth';
import { getRecentlyPlayed, getCurrentlyPlaying, getDevices } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentList from '../../components/RecentScreen/RecentList';
import RecentListHeader from '../../components/RecentScreen/RecentListHeader';


const RecentScreen = props => {

	const dispatch = useDispatch();
	const accessToken = useSelector(state => state.auth.accessToken);
	const [isLoading, setIsLoading] = useState(false);
	//const [devices, setDevices] = useState(null);
	const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
	const [recent, setRecent] = useState(null);

	
	useEffect(() => {

		setIsLoading(true);
		getData().then(() => {
			setIsLoading(false);
		});

	}, []);

	// useEffect(() => {
	// 	const refreshLogin = async () => {
	// 		if (!accessToken) {
	// 			await dispatch(refreshTokens()).then(() => {
	// 				props.navigation.navigate('RecentScreen');
	// 			});
	// 		}
	// 	};

	// 	refreshLogin();

	// }, [dispatch, accessToken]);

	const loadCurrent = useCallback(async () => {
		setIsLoading(true);
		try {
			const current = await getCurrentlyPlaying();
			setCurrentlyPlaying(current);
		} catch (err) {
			console.log(err);
			props.navigation.navigate('Starter');
		}
		setIsLoading(false);
	}, [getCurrentlyPlaying, setIsLoading]);
	

	useEffect(() => {
		setIsLoading(true);
		loadCurrent().then(() => {
				setIsLoading(false);
		});
	
	}, [loadCurrent]);

	// useEffect(() => {
	// 	const getCurrent = async () => {
	// 		const current = await getCurrentlyPlaying();
	// 		setCurrentlyPlaying(current);
	// 	};
	// 	getCurrent();

	// }, [dispatch ,setCurrentlyPlaying]);


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

	console.log(currentlyPlaying)

    return (
			<SafeAreaView style={styles.screen}>
				{ currentlyPlaying ?
				<RecentListHeader
					key={currentlyPlaying.item.id}
					currentlyPlayingImg={currentlyPlaying.item.album.images[0].url}
					title={currentlyPlaying.item.name}
					artist={currentlyPlaying.item.artists[0].name}
				/> : 
				<View style={styles.centered}>
					<ActivityIndicator size="small" />
				</View>
				}
				{recent ?
				<FlatList 
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={{marginLeft: 12, marginRight: 12, marginTop: 20}}
					data={recent.items}
					showsVerticalScrollIndicator={false}
					renderItem={({item}) => {
						return (
							<RecentList
								image={item.track.album.images[0].url}
								title={item.track.name}
								album={item.track.album.name}
								duration={item.track.duration_ms}
							
							/>
						);
					}}
				/> :
				<View style={styles.centered}>
					<ActivityIndicator size="small" />
				</View>}
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
});


export default RecentScreen;