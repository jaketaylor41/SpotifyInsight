import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';


const ProfileStats = props => {

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <View style={styles.stat}>
                    <Text style={styles.numFollowers}>{props.followers}</Text>
                    <Text style={styles.headerText}>Followers</Text>
                </View>

                <View style={styles.stat}>
                    <Text style={styles.numFollowers}>{props.following}</Text>
                    <Text style={styles.headerText}>Following</Text>
                </View>

                <View style={styles.stat}>
                    <Text style={styles.numFollowers}>{props.numPlaylists}</Text>
                    <Text style={styles.headerText}>Playlists</Text>
                </View>

            </View>
        </View>
    );


};

const styles = StyleSheet.create({
    
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    numFollowers: {
        fontFamily: 'montserrat-semi-bold',
        color: Colors.green,
        fontSize: 18,
        textAlign: 'center'
    },
    headerText: {
        fontFamily: 'montserrat-semi-bold',
        color: 'grey',
        fontSize: 15,
        textAlign: 'center'
    }

});


export default ProfileStats;
