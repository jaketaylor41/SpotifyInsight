import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Image } from 'react-native';
import LoginButton from '../components/Login/LoginButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import {refreshTokens, getTokens,  getUserData} from '../../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';


const LoginScreen = props => {

    const [accessTokenAvailable, setAccessTokenAvailable] = useState(false);

    const dispatch = useDispatch();
    let action = refreshTokens();

    const authHandler = async () => {

        // await AsyncStorage.removeItem('accessToken');
        // await AsyncStorage.removeItem('expirationTime');
        // await AsyncStorage.removeItem('refreshToken');
        try {
                const tokenExpirationTime = await getUserData('expirationTime');
                if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
                    await dispatch(action);
                } else {
                    props.navigation.navigate('Tabs');
                }
            } catch (err) {
                console.log(err);
            }

    };

    
    return (
        <View style={styles.screen}>
            <Image resizeMode="cover" style={styles.image} source={require('../../assets/images/SpotifyIcon.png')} />
            <Text style={styles.title}>Spotify Insight</Text>
            <LoginButton onPress={authHandler}>LOG IN TO SPOTIFY</LoginButton>
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