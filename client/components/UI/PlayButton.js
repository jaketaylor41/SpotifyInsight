import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


const PlayButton = props => {

    return <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
          <Ionicons name={Platform.OS === 'android' ? 'md-play' : 'ios-play'} size={50} color="white" />
        </View> 
    </TouchableOpacity>

};

const styles = StyleSheet.create({

    button: {
      position: 'absolute',
      bottom: -35,
      right: 20,
      backgroundColor: Colors.green,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 80,
      paddingTop: 6,
      paddingLeft: 8,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
    }

});


export default PlayButton;

