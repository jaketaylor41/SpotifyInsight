import React, { useState, useEffect } from 'react';
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopTracksList from '../../components/TopTracksScreen/TopTracksList';
import TopTracksHeader from '../../components/TopTracksScreen/TopTracksHeader';
import AsyncStorage from '@react-native-community/async-storage';



const TopTracksScreen = props => {

	const dispatch = useDispatch();
	const accessToken = useSelector(state => state.auth.accessToken);
	const [isLoading, setIsLoading] = useState(false);
	const [topTracks, setTopTracks] = useState(null);
	const [activeRange, setActiveRange] = useState('long');

	
	useEffect(() => {

		setIsLoading(true);
		getData().then(() => {
			setIsLoading(false)
		});
		
	}, []);

	useEffect(() => {
		const refreshLogin = async () => {
			if (!accessToken) {
				await dispatch(refreshTokens()).then(() => {
					props.navigation.navigate('TopTracksScreen');
				});
			}
		};

		refreshLogin();

	}, [dispatch, accessToken]);


	const apiCalls = {
		long: getTopTracksLong(),
		medium: getTopTracksMedium(),
		short: getTopTracksShort(),
	};

	const getData = async () => {
		const data = await getTopTracksLong();
		setTopTracks(data);
	}

	const changeRangeHandler = async (range) => {
		const data = await apiCalls[range];
		setTopTracks(data);
		setActiveRange(range);
	}


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" />
			</View>
		);
	}

    return (
			<SafeAreaView style={styles.screen}>
				<TopTracksHeader 
					onPressLong={() => changeRangeHandler('long')}
					onPressMedium={() => changeRangeHandler('medium')}
					onPressShort={() => changeRangeHandler('short')}
					isActive={activeRange}
				/>
				{topTracks ? <FlatList 
					keyExtractor={item => item.id}
					contentContainerStyle={{marginLeft: 12, marginRight: 12, marginTop: 20}}
					data={topTracks.items}
					showsVerticalScrollIndicator={false}
					renderItem={({item}) => {
						return (
							<TopTracksList 
								image={item.album.images[0].url}
								title={item.name}
								album={item.album.name}
								duration={item.duration_ms}
							/>
						);
					}}
				/> : <View style={styles.centered}>
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


export default TopTracksScreen;