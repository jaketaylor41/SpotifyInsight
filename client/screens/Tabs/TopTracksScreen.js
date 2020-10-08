import React, { useState, useEffect } from 'react';
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort, getTrack, getTrackFeatures } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopTracksList from '../../components/TopTracksScreen/TopTracksList';
import TopTracksHeader from '../../components/TopTracksScreen/TopTracksHeader';
import AsyncStorage from '@react-native-community/async-storage';



const TopTracksScreen = props => {

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [topTracks, setTopTracks] = useState(null);
	const [activeRange, setActiveRange] = useState('long');
	const token = useSelector(state => state.auth.accessToken);


	
	useEffect(() => {
		let mounted = true;
		setIsLoading(true);
		if (mounted) {
			getData().then(() => {
				setIsLoading(false)
			});
		}
		
		return () => {
			mounted = false;
		}

	}, []);


	const apiCalls = {
		long: getTopTracksLong,
		medium: getTopTracksMedium,
		short: getTopTracksShort,
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

	const selectTrackHandler = async (id) => {
		await dispatch(getTrackFeatures(id));
		await dispatch(getTrack(id));
		props.navigation.navigate('Track');
	};


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
								onSelect={() => {
									selectTrackHandler(item.id)
								}}
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