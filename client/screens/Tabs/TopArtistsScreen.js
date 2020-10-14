import React, { useState, useEffect, useRef } from 'react';
import { getAllTopArtists, getMediumTopArtists, getShortTopArtists, getArtistTopTracks, getArtist } from '../../../store/actions/spotifyData';
import { useSelector, useDispatch } from 'react-redux';

import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopArtistGrid from '../../components/TopArtistGrid/TopArtistGrid';
import TopArtistHeader from '../../components/TopArtistGrid/TopArtistHeader';


const TopArtistsScreen = props => {

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [topArtists, setTopArtists] = useState(null);
	const [activeRange, setActiveRange] = useState('long');
	const isMountedRef = useRef(null);


	useEffect(() => {
		isMountedRef.current = true;
		const apiCalls = {
			long: getAllTopArtists(),
			medium: getMediumTopArtists(),
			short: getShortTopArtists(),
		};

		const getRange = async () => {
			const data = await apiCalls[activeRange];
			setTopArtists(data);
		}
		if(isMountedRef.current){
			getRange();
		}
	}, [activeRange]);


	
	const changeRangeHandler = (range) => {
		setActiveRange(range);
	};

	const selectArtistHandler = async (id) => {
		await dispatch(getArtistTopTracks(id));
		await dispatch(getArtist(id));
		props.navigation.navigate('Artist', {
			artistId: id
		});
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
							onSelect={() => {
								selectArtistHandler(item.id)
							}}
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