import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Image } from 'react-native';
import LoginButton from '../components/Login/LoginButton';
import Colors from '../constants/Colors';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from 'react-native-dotenv';
import axios from 'axios';


const LoginScreen = props => {

const handleLogin = async () => {
    const redirectUrl = AuthSession.getRedirectUrl({ useProxy: true });
    const response = await AuthSession.startAsync({
        authUrl: `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-email&response_type=token`,
    });

    if (response.type !== 'success') {
        console.log(response.type);
        this.setState({ didError: true });
      } else {
        const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
          headers: {
            "Authorization": `Bearer ${response.params.access_token}`
          }
        });
        props.navigation.navigate('Tabs');
        console.log(userInfo);
      }
}





    return (
        <View style={styles.screen}>
            <Image resizeMode="cover" style={styles.image} source={require('../../assets/images/SpotifyIcon.png')} />
            <Text style={styles.title}>Spotify Insight</Text>
            <LoginButton onPress={handleLogin}>LOG IN TO SPOTIFY</LoginButton>
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