import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const TopTracksScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Top Tracks Screen</Text>
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: '#000'
    }
});


export default TopTracksScreen;