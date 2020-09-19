import * as AuthSession from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from 'react-native-dotenv';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';


export const setUserData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
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

export const LOGIN = 'LOGIN';

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
                '?client_id=' + CLIENT_ID +
                '&response_type=code' +
                '&redirect_uri=' + encodeURIComponent(redirectUrl) +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : ''),
        })

        if (result.type !== 'success') {
            return result.type;
        }

        return result.params.code;
};


export const getTokens = async () => {
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

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        const expirationValue = JSON.stringify(expirationTime);
        await setUserData('accessToken', accessToken);
        await setUserData('refreshToken', refreshToken);
        await setUserData('expirationTime', expirationValue);

    } catch (err) {
        console.error(err);
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

// API CALLS ***************************************************************************************


// export const getUser = async () => {
//     const token = await getUserData('accessToken');
    
//     const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//    const userInfo = axios.get('https://api.spotify.com/v1/me', { headers });

//    console.log(userInfo);
//    return userInfo;

// }

        // if (response.type !== 'success') {
        //     console.log(response.type);
        //   } else {
        //     const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
        //       headers: {
        //         "Authorization": `Bearer ${response.params.access_token}`
        //       }
        //     });
        //     console.log(userInfo);
        //     dispatch({type: LOGIN, token: response.params.access_token, userInfo: userInfo})
        //   }