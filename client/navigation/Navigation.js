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
import AuthButton from '../components/UI/AuthButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';

import Colors from '../constants/Colors';
import { FontAwesome, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';




const defaultNavOptions = {
  headerStyle: {
		backgroundColor: Colors.primaryBgColor,
		shadowColor: 'transparent'
	},
	headerTitle: ''
};



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
		defaultNavigationOptions: defaultNavOptions,
		headerMode: 'screen'
	}
);

const RecentsNavigator = createStackNavigator(
    {
        Recents: {
						screen: RecentScreen,
						navigationOptions: {
							headerShown: false
						}
				},
        Track: {
            screen: TrackAnalysisScreen
        }
        
    },
    {
        defaultNavigationOptions: defaultNavOptions,
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
        Recents: {screen: RecentsNavigator, navigationOptions: {
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

const DrawerNavigator = createDrawerNavigator(
    {
			Tabs: {
				screen: TabNavigator,
				navigationOptions: {
					drawerLabel: 'Spotify Insight'
				}
			},
			
    },
    {
      contentOptions: {
        activeTintColor: Colors.green
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20,}}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
							<View style={{alignItems: 'center'}}>
								<AuthButton onPress={() => {
										dispatch(logout());
									}}>Logout</AuthButton>
							</View>
            </SafeAreaView>
          </View>
        );
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
        Drawer: DrawerNavigator,
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