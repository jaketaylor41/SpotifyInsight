import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

const AuthLoadingScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { accessToken, refreshToken, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);


            if (expirationDate <= new Date() || !accessToken || !refreshToken) {
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();


            props.navigation.navigate('Tabs');
            dispatch(authenticate(accessToken, refreshToken, expirationTime));
        };

        tryLogin();

    }, [dispatch]);


    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    );


};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBgColor
    }

});

export default AuthLoadingScreen;