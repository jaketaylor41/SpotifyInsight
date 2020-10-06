import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';


const TopTracksHeader = props => {


    return (
        <View style={styles.container}>
          <View style={styles.topTracksTitleContainer}>
            <Text style={styles.topTracksTitle}>Top Tracks</Text>
          </View>
          <View style={styles.rangeContainer}>
            <TouchableOpacity onPress={props.onPressLong}>
              <View style={props.isActive === 'long' ? styles.activeRangeItem : styles.rangeItem}>
                <Text style={props.isActive === 'long' ? styles.activeRange : styles.range}>All Time</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressMedium}>
              <View style={props.isActive === 'medium' ? styles.activeRangeItem : styles.rangeItem}>
                <Text style={props.isActive === 'medium' ? styles.activeRange : styles.range}>Last 6 Months</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShort}>
              <View style={props.isActive === 'short' ? styles.activeRangeItem : styles.rangeItem}>
                <Text style={props.isActive === 'short' ? styles.activeRange : styles.range}>Last 4 Weeks</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );


};


const styles = StyleSheet.create({

  container: {
    marginTop: 30
  },
  topTracksTitle: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'montserrat-bold',
    textAlign: 'center'
  },
  rangeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  activeRangeItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.green,
    margin: 15
  },
  rangeItem: {
    margin: 15
  },
  activeRange: {
    color: '#fff',
    fontFamily: 'montserrat-semi-bold',
  },
  range: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'montserrat-semi-bold'
  }

});


export default TopTracksHeader;
