import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Image } from 'react-native';
import AuthButton from '../components/UI/AuthButton';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {refreshTokens, getTokens, getUserData} from '../../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
// import { getUserData, refreshTokens, getTokens } from '../../server/index';



const LoginScreen = props => {

    const dispatch = useDispatch();
    let action = getTokens();

    const authHandler = async () => {

        try {
            await dispatch(action);
            props.navigation.navigate('Tabs');
        } catch (err) {
            console.log("LOGIN SCREEN" + err);
        }
    };
    
    return (
        <View style={styles.screen}>
            <Image resizeMode="cover" style={styles.image} source={require('../../assets/images/SpotifyIcon.png')} />
            <Text style={styles.title}>Spotify Insight</Text>
            <AuthButton onPress={authHandler}>LOG IN TO SPOTIFY</AuthButton>
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBgColor
    },
    title: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'montserrat-bold',
    
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 30
    }
});


export default LoginScreen;