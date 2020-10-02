import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';


const TopTracks = props => {

	let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

	return (
		<View style={styles.container}>

			<View style={styles.trackFlatListItem}>
					<TouchableCmp onPress={props.onSelect} useForeground>
						<View style={styles.trackImgContainer}>
							<Image style={styles.artwork} source={{uri: props.image}} />
						</View>
					</TouchableCmp>
					<View style={styles.trackNameContainer}>
						<Text numberOfLines={2} ellipsizeMode='tail' style={styles.trackName}>{props.name}</Text>
					</View>
			</View>

		</View>
	);


};


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	trackFlatListItem: {
		marginRight: 30,
		flexDirection:'column',
		maxWidth: 130
	},
	artwork: {
		width: '100%',
		height: '100%'
	},
	trackImgContainer: {
		width: 140,
		height: 140,
		overflow: 'hidden',
	},
	trackNameContainer: {
		alignSelf: 'flex-start',
		flex: 1
	},
	trackName: {
		color: '#fff',
		fontFamily: 'montserrat-semi-bold',
		fontSize: 14,
		paddingTop: 10,
	}

});


export default TopTracks;