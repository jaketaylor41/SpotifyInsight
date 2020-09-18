import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ProfileScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Profile Screen</Text>
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


export default ProfileScreen;