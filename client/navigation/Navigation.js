import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../screens/LoginScreen';
import PlaylistsScreen from '../screens/Tabs/PlaylistsScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen';
import RecentScreen from '../screens/Tabs/RecentScreen';
import TopArtistsScreen from '../screens/Tabs/TopArtistsScreen';
import TopTracksScreen from '../screens/Tabs/TopTracksScreen';





//Route Name: Screen Component to Route To
// const StackNavigator = createStackNavigator({

// });


const TabNavigator = createBottomTabNavigator(
    {
        Playlists: PlaylistsScreen,
        Profile: ProfileScreen,
        Recents: RecentScreen,
        TopArtists: TopArtistsScreen,
        TopTracks: TopTracksScreen
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
        Auth: AuthStackNavigator,
        Tabs: TabNavigator
    },
    {
      defaultNavigationOptions: {
          headerShown: false,
      }
    }
);



export default createAppContainer(AuthSwitchNavigator);