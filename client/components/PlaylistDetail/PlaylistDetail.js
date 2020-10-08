import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';


const PlaylistDetail = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


	return (
		<View style={styles.container}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View style={styles.item}>
          <View style={styles.trackImageContainer}>
            <Image style={styles.playlistCoverArt} source={{uri: props.image}} />
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.songTitle}>{props.title}</Text>
            <Text style={styles.songArtist}>{props.artist}</Text>
          </View>
        </View>
      </TouchableCmp>
		</View>
	);

};

const screenDimension = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginLeft: 12
  },
  item: {
		flexDirection: 'row',
		marginBottom: 15
  },
  imageContainer: {
    width: screenDimension.width,
		height: 350,
		overflow: 'hidden',
  },
	trackImageContainer: {
		width: 50,
		height: 50,
		overflow: 'hidden'
	},
	playlistCoverArt: {
		width: '100%',
		height: '100%'
	},
	titleContainer: {
		flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 260,
		marginLeft: 20
  },
  songTitle: {
    color: '#fff',
    fontFamily: 'montserrat-semi-bold',
    fontSize: 13
  },
  songArtist: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 12
  }

});


export default PlaylistDetail;