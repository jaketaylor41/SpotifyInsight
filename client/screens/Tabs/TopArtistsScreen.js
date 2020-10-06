import React, { useState, useEffect, useCallback } from 'react';
import { refreshTokens } from '../../../store/actions/auth';
import { getAllTopArtists, getMediumTopArtists, getShortTopArtists } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopArtistGrid from '../../components/TopArtistGrid/TopArtistGrid';
import TopArtistHeader from '../../components/TopArtistGrid/TopArtistHeader';
import AsyncStorage from '@react-native-community/async-storage';


const TopArtistsScreen = props => {

	const dispatch = useDispatch();
	const accessToken = useSelector(state => state.auth.accessToken);
	const [isLoading, setIsLoading] = useState(false);
	const [topArtists, setTopArtists] = useState(null);
	const [activeRange, setActiveRange] = useState('long');

	
	useEffect(() => {

		setIsLoading(true);
		getData().then(() => {
			setIsLoading(false);
		});

	}, []);

	useEffect(() => {
		const refreshLogin = async () => {
			if (!accessToken) {
				await dispatch(refreshTokens()).then(() => {
					props.navigation.navigate('TopArtistsScreen');
				});
			}
		};

		refreshLogin();

	}, [dispatch, accessToken]);
	
	const apiCalls = {
		long: getAllTopArtists(),
		medium: getMediumTopArtists(),
		short: getShortTopArtists(),
	};

	const getData = async () => {
		const data = await getAllTopArtists();
		setTopArtists(data);
	}
	
	const changeRangeHandler = async (range) => {
		const data = await apiCalls[range];
		setTopArtists(data);
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
				<TopArtistHeader
					onPressLong={() => changeRangeHandler('long')}
					onPressMedium={() => changeRangeHandler('medium')}
					onPressShort={() => changeRangeHandler('short')}
					isActive={activeRange}
				/>
				{topArtists ? <FlatList 
					keyExtractor={item => item.id}
					contentContainerStyle={{marginLeft: 12, marginRight: 12, marginTop: 20}}
					data={topArtists.items}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					renderItem={({item}) => {
						return (
							<TopArtistGrid 
								image={item.images[0].url}
								name={item.name}
							/>
						);
					}}
				
			/> : 	<View style={styles.centered}>
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
    title: {
        fontSize: 20,
        color: '#000'
    },
		centered: { 
				flex: 1, 
				justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primaryBgColor
    },
});


export default TopArtistsScreen;