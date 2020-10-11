import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, Linking, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';


const PlaylistDetailHeader = props => {

	return (
		<View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image resizeMode={'cover'} style={{width: '100%', height: '100%'}} source={{uri: props.playlistImage}} alt="avatar" />
      </View>
      <View style={styles.playlistInfoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.playlistInfoTitle}>{props.playlistTitle}</Text>
          <Text style={styles.playlistInfoText}>Followers: {props.followers}</Text>
          <Text style={styles.playlistInfoText}>Created By: {props.creator}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(props.playUri)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>View on Spotify</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginLeft: 12,
    flexDirection: 'row'
  },
  textContainer: {
    width: '50%'
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'flex-end'
  },
  button: {
    backgroundColor: Colors.green,
    width: 150,
    height: 50,
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
    color: '#fff'
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