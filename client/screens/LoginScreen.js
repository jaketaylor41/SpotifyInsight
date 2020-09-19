import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Image } from 'react-native';
import LoginButton from '../components/Login/LoginButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import {refreshTokens, getUserData} from '../../store/actions/auth';
// import { getUserData, refreshTokens, getTokens } from '../../server/index';



const LoginScreen = props => {

    const [error, setError] = useState();

    const dispatch = useDispatch();
    let action = refreshTokens();

    const authHandler = async () => {

        setError(null);
        try {
            await dispatch(action);
            const accessToken = await getUserData('accessToken');
            const expiration = await getUserData('expirationTime');
            console.log(accessToken)
            console.log(expiration)
            if (accessToken) {
                props.navigation.navigate('Tabs');
            }
        } catch (err) {
            setError(err.message);
        }

    };

    // const [token, setToken] = useState(false);

    // const login = async () => {
        // const tokenExpirationTime = await getUserData('expirationTime');
        // try {   

        //     if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
        //         await refreshTokens();
        //     } else {
        //         setToken(true);
        //     }

        // } catch (err) {
        //     console.error(err);
        // }

    // }

    
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