import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const TopArtist = props => {

	const formatNum = new Intl.NumberFormat();

    return (
			<View style={styles.container}>
				<View>
					<View style={styles.imageContainer}>
						<Image resizeMode={'cover'} style={styles.avatar} source={{uri: props.image}} alt="avatar" />
						<View style={styles.textContainer}>
							<LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
								<Text style={styles.name}>{props.name}</Text>
							</LinearGradient>
						</View>
					</View>
				</View>
				<View style={styles.followersContainer}>
						<Text style={styles.followers}>{formatNum.format(props.followers)} followers</Text>
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
  avatar: {
		width: '100%',
		height: '100%'
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
		fontSize: 50,
		marginLeft: 12,
		marginBottom: 10,
		textAlign: 'left',
  },
	followersContainer: {
		marginTop: 10
	},
	followers: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontFamily: 'montserrat-regular',
		fontSize: 15,
		marginLeft: 12
	},
	genreContainer: {
		marginLeft: 12,
	},
	genreWrapper : {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10,
	},
	genre: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 12,
		fontFamily: 'montserrat-regular'
	},
	sectionTitleContainer: {
		marginTop: 40,
		marginLeft: 12
	},
	sectionTitle: {
		color: '#fff',
		fontFamily: 'montserrat-bold',
		fontSize: 20
	}

});


export default TopArtist;
