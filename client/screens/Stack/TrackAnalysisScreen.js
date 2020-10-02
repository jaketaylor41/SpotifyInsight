import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import TrackAnalysis from '../../components/TrackAnalysis/TrackAnalysis';

const TrackAnalysisScreen = props => {

	const trackId = props.navigation.getParam('trackId');
	const [isLoading, setIsLoading] = useState(false);
	const trackAnalysis = useSelector(state => state.spotifyData.trackAnalysis);
	const trackFeatures = useSelector(state => state.spotifyData.trackFeatures);
	const selectedTrack = useSelector(state => 
		state.spotifyData.topTracks.items.find(track => track.id === trackId)
	);
	const [values, setValues] = useState([]);
	//const [labels, setLabels] = useState([]);



	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const {acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence } = trackFeatures;
	// const obj = [
	// 				{data: 'acousticness', value: acousticness},
	// 				{data: 'danceability', value: danceability},
	// 				{data: 'energy', value: energy},
	// 				{data: 'instrumentalness', value: instrumentalness},
	// 				{data: 'liveness', value: liveness},
	// 				{data: 'speechiness', value: speechiness},
	// 				{data: 'valence', value: valence}
	// 			];
	const data = [];
	//const labelArr = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence' ];
	data.push(acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence);
	//console.log(data)
	useState(() => {

		setValues(data);
		//setLabels(labelArr);

	}, []);


	if (trackFeatures) {
		return (
			<SafeAreaView style={styles.screen}>
				<ScrollView>
					<TrackAnalysis data={values} />
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
});


export default TrackAnalysisScreen;