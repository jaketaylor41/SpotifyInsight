import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { convertDuration } from '../../../util';


const RecentList = props => {

  return (
    <View style={styles.container}>
      <View style={styles.recentSong}>
        <View style={styles.trackImageContainer}>
          <Image style={styles.trackImage} source={{uri: props.image}} />
        </View>
        <View style={styles.trackTitleContainer}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.trackTitle}>{props.title}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.album}>{props.album}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{convertDuration(props.duration)}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  
	recentSong: {
		flexDirection: 'row',
		marginBottom: 15,
		
	},
	trackImageContainer: {
		width: 50,
		height: 50
	},
	trackImage: {
		width: '100%',
		height: '100%'
	},
	trackTitleContainer: {
		justifyContent: 'center',
		marginLeft: 10,
		width: '50%',
	},
	trackTitle: {
		color: '#fff',
		fontSize: 12,
		fontFamily: 'montserrat-semi-bold',
	},
	album: {
		color: '#fff',
		fontFamily: 'montserrat-regular',
		fontSize: 12
	},
	durationContainer: {
		width: '50%',
		marginLeft: 90
	},
	duration: {
		color: '#fff',
		fontFamily: 'montserrat-regular',
		fontSize: 12
  }

});


export default RecentList;