import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';


const PlaylistDetailHeader = props => {

	return (
		<View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode={'cover'} style={{width: '100%', height: '100%'}} source={{uri: props.playlistImage}} alt="avatar" />
      </View>
      <View style={styles.playlistInfoContainer}>
        <Text style={styles.playlistInfoTitle}>{props.playlistTitle}</Text>
        <Text style={styles.playlistInfoText}>Followers: {props.followers}</Text>
        <Text style={styles.playlistInfoText}>Created By: {props.creator}</Text>
      </View>
    </View>
	);

};


const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  imageContainer: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    marginBottom: 20
  },
  playlistInfoContainer: {
    marginLeft: 12
  },
  playlistInfoTitle: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'montserrat-bold'
  },
  playlistInfoText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'montserrat-semi-bold'
  }
  

});


export default PlaylistDetailHeader;