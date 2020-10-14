import React, {useState} from 'react';
import { View, StyleSheet, Image, Text, Dimensions, Linking  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayButton from '../UI/PlayButton';

const TrackAnalysis = props => {

	const [imgWidth, setImageWidth] = useState();
	const [imgHeight, setImageHeight] = useState();

	Image.getSize(props.image, (width, height) => {
		// calculate image width and height 
		const screenWidth = Dimensions.get('window').width
		const scaleFactor = width / screenWidth;
		const imageHeight = height / scaleFactor;
		setImageWidth(screenWidth);
		setImageHeight(imageHeight);
	});

    return (
			<View>
				<View style={styles.trackIntroContainer}>
					<View style={styles.imageContainer}>
						<Image resizeMode={'cover'} style={{width: imgWidth, height: imgHeight}} source={{uri: props.image}} alt="avatar" />
						<View style={styles.textContainer}>
							<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
								<View>
									<Text style={styles.title}>{props.name}</Text>
								</View>
								<View style={styles.subTextContainer}>
									<Text style={styles.artist}>{props.artist}</Text>
									<Text style={styles.releaseYear}> • Released {props.release}</Text>
								</View>
							</LinearGradient>
						</View>
					</View>
							<PlayButton onPress={() => Linking.openURL(props.playUri)}/>
				</View>
			</View>
    );
};


const deviceWidth = Dimensions.get('window');
const styles = StyleSheet.create({

	trackIntroContainer: {
		marginBottom: 50
	},
	imageContainer: {
		width: deviceWidth.width,
		height: 350,
		overflow: 'hidden',
  },
	textContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
	},
	title: {
		fontFamily: 'montserrat-bold',
		color: '#fff',
		paddingTop: 15,
		fontSize: 35,
		marginLeft: 12,
		textAlign: 'left',
	},
	artist: {
		textAlign: 'center',
		fontFamily: 'montserrat-semi-bold',
		color: '#fff',
		textAlign: 'left',
		marginLeft: 12,
		paddingTop: 5,
		paddingBottom: 5,
	},
	releaseYear: {
		textAlign: 'center',
		fontFamily: 'montserrat-semi-bold',
		color: '#fff',
		textAlign: 'left',
		paddingTop: 5,
		paddingBottom: 5,
	},
	subTextContainer: {
		flexDirection: 'row',
		maxWidth: 204
	}

});


export default TrackAnalysis;
