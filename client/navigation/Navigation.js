import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen';
import RecentScreen from '../screens/Tabs/RecentScreen';
import TopArtistsScreen from '../screens/Tabs/TopArtistsScreen';
import TopTracksScreen from '../screens/Tabs/TopTracksScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ArtistProfileScreen from '../screens/Stack/ArtistProfileScreen';
import TrackAnalysisScreen from '../screens/Stack/TrackAnalysisScreen';
import PlaylistDetailScreen from '../screens/Stack/PlaylistDetailScreen';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';

import Colors from '../constants/Colors';
import { FontAwesome, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';





//Route Name: Screen Component to Route To
const ProfileNavigator = createStackNavigator(
    {
        UserProfile: {
          screen: ProfileScreen
        },
        Artist: {
          screen: ArtistProfileScreen
				},
				Track: {
					screen: TrackAnalysisScreen
				},
				Playlist: {
					screen: PlaylistDetailScreen
				}
	},
    {
			defaultNavigationOptions: {
					headerStyle: {
							backgroundColor: Colors.primaryBgColor,
							shadowColor: 'transparent'
					},
					headerTitle: ''
			},
			headerMode: 'screen'
	}
);


const TabNavigator = createMaterialBottomTabNavigator(
    {
        Profile: {screen: ProfileNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <FontAwesome name="user" size={24} color={tabInfo.tintColor}/>;
            },
            
        }},
        TopArtists: {screen: TopArtistsScreen, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Entypo name="modern-mic" size={24} color={tabInfo.tintColor}/>;
            },
            title: 'Top Artists',
        }},
        TopTracks: {screen: TopTracksScreen, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <FontAwesome name="music" size={24} color={tabInfo.tintColor}/>;
            },
            title: 'Top Tracks',
        }},
        Recents: {screen: RecentScreen, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Entypo name="back-in-time" size={24} color={tabInfo.tintColor}/>;
            },
            title: 'Recents',
        }},
    },
    {
        activeColor: '#fff',
        inactiveColor: 'grey',
        barStyle: {
            backgroundColor: '#000'
        }
    }
);



const AuthStackNavigator = createStackNavigator(
    {
        Auth: LoginScreen
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        }
    }
);

const AuthSwitchNavigator = createSwitchNavigator(
    {
        Starter: AuthLoadingScreen,
        Auth: AuthStackNavigator,
				Tabs: TabNavigator
    },
    {
        initialRouteName: 'Starter'
    },
    {
      defaultNavigationOptions: {
          headerShown: false,
      }
    }
);



export default createAppContainer(AuthSwitchNavigator);