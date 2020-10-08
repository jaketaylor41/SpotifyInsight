import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Colors from '../../constants/Colors';


const RecentListHeader = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


    return (
        <View style={styles.container}>
          <View style={styles.nowPlayingContainer}>
            <Text style={styles.nowPlaying}>Now Playing</Text>
            <View style={styles.imageContainer}>
              <Image resizeMode={'contain'} style={{width: '100%', height: '100%'}} source={{uri: props.currentlyPlayingImg}} alt="avatar" />
            </View>
            <TouchableCmp onPress={props.onSelect} useForeground>
              <View style={styles.nowPlayingSubContainer}>
                <Text style={styles.songTitle}>{props.title}</Text>
                <Text style={styles.artist}>{props.artist}</Text>
              </View>
            </TouchableCmp>
          </View>
        </View>
    );


};

const deviceWidth = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  nowPlayingContainer: {
    marginBottom: 50
  },
	imageContainer: {
    width: deviceWidth.width,
    padding: 12,
		height: 360,
    overflow: 'hidden',
  },
  nowPlayingSubContainer: {
    marginTop: 15,
  },
  nowPlaying: {
    color: '#fff',
    fontSize: 25,
    marginLeft: 12,
    fontFamily: 'montserrat-bold',
    textAlign: 'left'
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'montserrat-semi-bold',
  },
  artist: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  }

});


export default RecentListHeader;
