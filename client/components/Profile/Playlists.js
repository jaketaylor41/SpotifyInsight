import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const Playlists = props => {

    return (
			<View style={styles.container}>
				<View style={styles.item}>
					<View style={styles.imageContainer}>
						<Image style={styles.playlistCoverArt} source={{uri: props.image}} />
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.playlistTitle}>{props.title}</Text>
						<Text style={styles.totalSongs}>{props.totalSongs} Songs</Text>
					</View>
				</View>
			</View>
    );
};


const styles = StyleSheet.create({

	container: {

	},
	item: {
		flexDirection: 'row',
		marginBottom: 15
	},
	imageContainer: {
		width: 140,
		height: 140,
		overflow: 'hidden'
	},
	playlistCoverArt: {
		width: '100%',
		height: '100%'
	},
	titleContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 20
	},
	playlistTitle: {
		color: '#fff',
		fontFamily: 'montserrat-semi-bold',
		fontSize: 14
	},
	totalSongs: {
		color: 'grey',
		fontFamily: 'montserrat-semi-bold',
		fontSize: 14,
		textAlign: 'left'
	}



});


export default Playlists;