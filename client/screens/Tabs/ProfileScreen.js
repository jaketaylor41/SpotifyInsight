import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUser } from '../../../store/actions/auth';

const ProfileScreen = props => {

    getUser();

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Profile Screen</Text>
            <Image  />
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