import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator, Dimensions, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import TrackAnalysis from '../../components/TrackAnalysis/TrackAnalysis';

import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import ModalButton from '../../components/UI/ModalButton';
import FeaturesGrid from '../../components/TrackAnalysis/FeaturesGrid';
import ModalBody from '../../components/UI/ModalBody';

import { convertDuration, convertPitch, Gradient } from '../../../util';


const TrackAnalysisScreen = props => {
	
	const [isLoading, setIsLoading] = useState(false);
	const trackFeatures = useSelector(state => state.spotifyData.trackFeatures);
	const selectedTrack = useSelector(state => state.spotifyData.trackInfo);
	const [chartValues, setValues] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const closeModal = () => {
    setIsAddMode(false);
  };


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	const {acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence } = trackFeatures;
	const obj = [
					{value: acousticness, label: 'acousticness'},
					{value: danceability, label: 'danceability'},
					{value: energy, label: 'energy'},
					{value: instrumentalness, label: 'instrumental'},
					{value: liveness, label: 'liveness'},
					{value: speechiness, label: 'speechiness'},
					{value: valence, label: 'valence'}
				];

	useState(() => {

		setValues(obj);

	}, []);


	const deviceWidth = Dimensions.get('window');

	return (
		<SafeAreaView style={styles.screen}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{selectedTrack && 
					<TrackAnalysis
						image={selectedTrack.album.images[0].url}
						name={selectedTrack.name}
						artist={selectedTrack.artists[0].name}
						release={selectedTrack.album.release_date.slice(0,4)}
						playUri={selectedTrack.external_urls.spotify}
					/> }
					<View style={styles.sectionTitleContainer}>
						<Text style={styles.sectionTitle}>Track Features</Text>
					</View>
					{trackFeatures &&
					<FeaturesGrid
						duration={convertDuration(trackFeatures.duration_ms)}
						trackKey={convertPitch(trackFeatures.key)}
						mode={trackFeatures.mode === 1 ? 'Major' : 'Minor'}
						timeSig={trackFeatures.time_signature}
						tempo={Math.round(trackFeatures.tempo)}
					/>}
					{trackFeatures && 
				<View style={styles.container}>
						<YAxis
							data={chartValues}
							style={{ marginRight: 10, marginBottom: 50}}
							contentInset={{ top: 10, bottom: 10 }}
							yAccessor={({ item }) => item.value}
							xAccessor={({ item }) => item.label}
							svg={{
									fill: "#fff",
									fontSize: deviceWidth.width/45
							}}
							numberOfTicks={10}
							formatLabel={value => value}
							/>
					<View style={styles.innerContainer}>
						<BarChart
							style={{ flex: 1}}
							data={chartValues}
							contentInset={{ top: 10, bottom: 10 }}
							yAccessor={({ item }) => item.value}
							xAccessor={({ item }) => item.label}
							numberOfTicks={10}
							yMin={0}
							svg={{ fill: 'url(#gradient)', fillOpacity: 0.8 }}
							width={deviceWidth}
						>
						<Grid svg={{strokeDasharray: [6, 8], stroke: '#fff'}} direction={Grid.Direction.BOTH}/>
						<Gradient />
						</BarChart>
						<XAxis
							style={{ height: 50}}
							data={chartValues}
							numberOfTicks={7}
							formatLabel={(_, index) => chartValues[index].label}
							contentInset={{ left: 40, right: 50}}
							svg={{ fontSize: 10, fill: '#fff', rotation: -40, textAnchor: 'end', dy: 4, dx: 6}}
						/>
					</View>
				</View> }
				<View style={styles.modalBtnContainer}>
					<ModalButton onPress={() => setIsAddMode(true)}>Feature Descriptions</ModalButton>
				</View>
				<Modal transparent={true} visible={isAddMode} dismissable animationType='slide'>
					<ModalBody onCancel={closeModal} />
				</Modal>
				</ScrollView>	
			</SafeAreaView>

		);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primaryBgColor,
	},
	container: {
		flexDirection: 'row',
		height: 300,
		marginRight: 12,
		marginLeft: 12,
		paddingBottom: 20
	},
	innerContainer: {
		flex: 1,
	},
	sectionTitleContainer: {
		marginLeft: 12,
		marginBottom: 30
	},
	sectionTitle: {
		color: '#fff',
		fontFamily: 'montserrat-bold',
		fontSize: 20,
	},
	modalBtnContainer: {
		marginTop: 30,
		marginBottom: 50,
		alignItems: 'center'
	}
});


export default TrackAnalysisScreen;