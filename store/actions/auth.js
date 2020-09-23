import * as AuthSession from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from 'react-native-dotenv';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN = 'LOGIN';

export const setUserData = async (key, value) => {
    try {
        
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        console.error(err);
    }
}

export const getUserData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (err) {
        console.error(err);
    }
}


const scopesArr = 
    ['user-read-private',
        'user-read-email',
        'user-read-recently-played',
        'user-top-read',
        'user-follow-read',
        'user-follow-modify',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public'
    ];
const scopes = scopesArr.join(' ');

export const getAuthorizationCode = async () => {

        const redirectUrl = AuthSession.getRedirectUrl({ useProxy: true });
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                CLIENT_ID +
                ('&scope=' + encodeURIComponent(scopes)) +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl),
        })

        if (result.type !== 'success') {
            return result.type;
        }
        //console.log(result)
        return result.params.code;
};


export const getTokens = () => {
    return async dispatch => {
        try {
            const authorizationCode = await getAuthorizationCode();
            const credsB64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${REDIRECT_URI}`,
            });
            const responseJson = await response.json();
            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
            } = responseJson;

            console.log(responseJson);

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            const expirationValue = JSON.stringify(expirationTime);
            await setUserData('accessToken', accessToken);
            await setUserData('refreshToken', refreshToken);
            await setUserData('expirationTime', expirationValue);
            dispatch({type: LOGIN, accessToken: accessToken, refreshToken: refreshToken});
    
        } catch (err) {
            console.error(err);
        }
    }
}


export const refreshTokens = () => {
    return async dispatch => {
        try {
            const credsB64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
            const refreshToken = await getUserData('refreshToken');
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            });
            const responseJson = await response.json();
            if (responseJson.error) {
                await getTokens();
            } else {
                const {
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                    expires_in: expiresIn,
                } = responseJson;

                console.log(responseJson)

                const expirationTime = new Date().getTime() + expiresIn * 1000;
                const expirationValue = JSON.stringify(expirationTime);
                await setUserData('accessToken', newAccessToken);
                if (newRefreshToken) {
                    await setUserData('refreshToken', newRefreshToken);
                }
                await setUserData('expirationTime', expirationValue);
                dispatch({type: LOGIN, accessToken: newAccessToken, refreshToken: newRefreshToken});
            }
        } catch (err) {
            console.error(err);
        }
    }
}
