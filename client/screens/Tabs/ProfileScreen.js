import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import User from '../../components/Profile/User';
import { getUserInfo } from '../../../store/actions/spotifyData';
import { stringify } from 'querystring';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserData } from '../../../store/actions/auth';
import { FontAwesome } from '@expo/vector-icons'; 


const ProfileScreen = props => {

    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const user = useSelector(state => state.spotifyData.user);
    
    useEffect(() => {
        
        const fetchUser = async () => {
            const token = await getUserData('accessToken');
            try {
                if (token !== null) {
                   await dispatch(getUserInfo())
                   setUserInfo(user);
                   console.log(userInfo)
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchUser();
        
        
    }, [dispatch]);
    

    const userIcon = <FontAwesome name="user-circle" size={24} color="black" />;


    return (
        <View style={styles.screen}>
            <User
                image={userInfo ? userInfo.images[0].url : userIcon}
                name={userInfo.display_name}
                followers={userInfo.followers.total} />
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primaryBgColor,
        justifyContent: 'center'
    }
});


export default ProfileScreen;