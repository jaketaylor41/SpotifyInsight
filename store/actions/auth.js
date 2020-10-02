import * as AuthSession from 'expo-auth-session';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from 'react-native-dotenv';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';

const saveDataToStorage = (accessToken, refreshToken, expirationTime) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
            expirationTime: expirationTime
        })
    );
}

export const authenticate = (accessToken, refreshToken) => {
    return {type: AUTHENTICATE, accessToken: accessToken, refreshToken: refreshToken};
};


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

            //console.log(responseJson);

            //const expirationValue = JSON.stringify(expirationTime);
            // await setUserData('accessToken', accessToken);
            // await setUserData('refreshToken', refreshToken);
            // await setUserData('expirationTime', expirationValue);
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            saveDataToStorage(accessToken, refreshToken, expirationTime);
            dispatch(authenticate(accessToken, refreshToken));
    
        } catch (err) {
            console.error(err);
        }
    }
}


export const refreshTokens = () => {
    return async dispatch => {
        try {
            const credsB64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
            const userData = await AsyncStorage.getItem('userData');
            const transformedData = JSON.parse(userData);
            const refresh = transformedData.refreshToken;
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&refresh_token=${refresh}`,
            });
            const responseJson = await response.json();
            //console.log(responseJson)
            // if (responseJson.error) {
            //     await getTokens();
            //     //console.log("REFRESHTOKENS() " + responseJson.error)
            // } else {
                const {
                    access_token: newAccessToken,
                    expires_in: expiresIn,
                } = responseJson;

                //console.log(responseJson)

                // const expirationTime = new Date().getTime() + expiresIn * 1000;
                // const expirationValue = JSON.stringify(expirationTime);
                // await setUserData('accessToken', newAccessToken);
                // if (newRefreshToken) {
                //     await setUserData('refreshToken', newRefreshToken);
                // }
                // await setUserData('expirationTime', expirationValue);
                const expirationTime = new Date().getTime() + expiresIn * 1000;
                console.log('REFRESH FUNC ' + expirationTime)
                saveDataToStorage(newAccessToken, refresh, expirationTime);
                dispatch(authenticate(newAccessToken, refresh));
            //}
        } catch (err) {
            console.error(err);
        }
    }
}
