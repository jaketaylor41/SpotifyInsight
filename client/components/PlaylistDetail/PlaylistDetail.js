import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const PlaylistDetail = props => {

	return (
		<View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image style={styles.playlistCoverArt} source={{uri: props.image}} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.playlistTitle}>{props.title}</Text>
        </View>
      </View>
		</View>
	);

};


const styles = StyleSheet.create({
  item: {
		flexDirection: 'row',
		marginBottom: 15
	},
	imageContainer: {
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
		marginLeft: 20
	},

});


export default PlaylistDetail;