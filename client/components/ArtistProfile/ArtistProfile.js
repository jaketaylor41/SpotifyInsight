import React, {useState} from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import 'intl';
import 'intl/locale-data/jsonp/en';


const TopArtist = props => {

	const formatNum = new Intl.NumberFormat();
	if (typeof Intl === 'undefined') {
    require('intl')  
    require('intl/locale-data/jsonp/en')  
	}

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
			<View style={styles.container}>
					<View>
						<View style={styles.imageContainer}>
							<Image resizeMode={'cover'} style={{width: imgWidth, height: '100%'}} source={{uri: props.image}} alt="avatar" />
							<View style={styles.textContainer}>
								<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
									<Text style={styles.name}>{props.name}</Text>
								</LinearGradient>
							</View>
						</View>
					</View>
					<View style={styles.followersContainer}>
						<View style={styles.followersTextContainer}>
							<Text style={styles.followers}>{formatNum.format(props.followers)} followers</Text>
						</View>
						<TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
							<View style={styles.button}>
								<Entypo style={props.following && {display: 'none'}} name="plus" size={20} color="white" />
								<Text style={styles.buttonText}>{!props.following ? 'Follow' : 'Following'}</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.genreContainer}>
						<View style={styles.genreWrapper}>
							{props.genres.map((item, index) => <Text key={item} style={styles.genre}>{(index ? ' • ' : '') + item}</Text>)}
						</View>
					</View>
					<View style={styles.sectionTitleContainer}>
						<Text style={styles.sectionTitle}>Popular Songs</Text>
					</View>
			</View>
    );

};

const screenDimension = Dimensions.get('window');


const styles = StyleSheet.create({

	container: {
		flex: 1,
	},
	imageContainer: {
		width: screenDimension.width,
		height: 350,
		overflow: 'hidden',
  },
	textContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
	},
  name: {
		textAlign: 'center',
		fontFamily: 'montserrat-bold',
		color: '#fff',
		paddingTop: 15,
		fontSize: 40,
		marginLeft: 12,
		marginBottom: 10,
		textAlign: 'left',
  },
	followersContainer: {
		marginTop: 10,
		flexDirection: 'row'
	},
	followersTextContainer: {
		width: '50%'
	},
	followers: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontFamily: 'montserrat-regular',
		fontSize: 15,
		marginLeft: 12
	},
	buttonContainer: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		height: 35
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.green,
    width: 100,
    height: 35,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
		elevation: 5,
		
	},
	buttonText: {
		fontFamily: 'montserrat-semi-bold',
		color: '#fff',
		fontSize: 15,
		paddingLeft: 2
	},
	genreContainer: {
		marginLeft: 12,
	},
	genreWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
		maxWidth: 250
	},
	genre: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 15,
		fontFamily: 'montserrat-regular',
	},
	sectionTitleContainer: {
		marginTop: 30,
		marginLeft: 12
	},
	sectionTitle: {
		color: '#fff',
		fontFamily: 'montserrat-bold',
		fontSize: 20
	}

});


export default TopArtist;
