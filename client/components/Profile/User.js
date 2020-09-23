import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../../constants/Colors';


const User = props => {


    return (
        <View style={styles.user}>
            <View style={styles.imageContainer}>
                <Image resizeMode={'cover'} style={styles.avatar} source={{uri: props.image}} alt="avatar" />
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.following}>
                    <Text style={styles.numFollowers}>{props.followers}</Text>
                    <Text style={styles.headerText}>Followers</Text>
                </View>
            </View>
        </View>
    );


};

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 200,
        width: '100%',
        height: 170,
        overflow: 'hidden',
        marginTop: 50
    },

    avatar: {
        width: 170,
        height: 170
    },

    title: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        color: '#fff',
        paddingTop: 15,
        fontSize: 25
    },

    profileInfo: {
    
    },

    following: {
        paddingTop: 15
    },

    numFollowers: {
        fontFamily: 'montserrat-semi-bold',
        color: Colors.green,
        fontSize: 18
    },

    headerText: {
        fontFamily: 'montserrat-semi-bold',
        color: 'grey',
        fontSize: 15
    }

});


export default User;
