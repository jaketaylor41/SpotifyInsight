import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';


const TopArtistGrid = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

    return (
        <View style={styles.container}>
          <View style={styles.item}>
            <TouchableCmp onPress={props.onSelect} useForeground>
              <View style={styles.artworkContainer}>
                <Image style={styles.artwork} source={{uri: props.image}} />
              </View>
            </TouchableCmp>
            <View style={styles.artistNameContainer}>
              <Text style={styles.artistName}>{props.name}</Text>
            </View>
          </View>
        </View>
    );


};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 20
  },
	artwork: {
		width: '100%',
		height: '100%'
	},
	artworkContainer: {
		width: 140,
		height: 140,
		borderRadius: 200,
		overflow: 'hidden',
	},
	artistNameContainer: {
		alignSelf: 'center',
		flex: 1
	},
	artistName: {
		color: '#fff',
		fontFamily: 'montserrat-semi-bold',
		fontSize: 14,
    paddingTop: 10,
    textAlign: 'center'
	}

});


export default TopArtistGrid;
