import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { dispatchUser } from '../../../store/actions/spotifyData';
import { getUserData, refreshTokens } from '../../../store/actions/auth';
import { FontAwesome } from '@expo/vector-icons'; 
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';



const ProfileScreen = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.spotifyData.user);
    const playlists = useSelector(state => state.spotifyData.playlists);
    const following = useSelector(state => state.spotifyData.following);
    const topArtists = useSelector(state => state.spotifyData.topArtists);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const loadUserProfile = useCallback(async () => {
      console.log('PROFILE TAB LOADED');
      setIsRefreshing(true);
      try {
        await dispatch(dispatchUser());
      } catch (err) {
        console.log(err);
      }
      setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    useEffect(() => {
      const willFocus = props.navigation.addListener(
        'willFocus',
        loadUserProfile
      );
  
      return () => {
        willFocus.remove();
      };
    }, [loadUserProfile]);
    

    useEffect(() => {

			setIsLoading(true);
			loadUserProfile().then(() => {
					setIsLoading(false);
      });
    
		}, [dispatch, loadUserProfile]);

		

		if (isLoading) {
			return (
				<View style={styles.centered}>
					<ActivityIndicator size="large" />
				</View>
			);
		}

		if (!isLoading && !user) {
			return (
				<View style={styles.centered}>
					<Text>No users found</Text>
				</View>
			);
		}


    return (
      <View style={styles.screen}>
        <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
            <View>
                <ProfileHeader image={user.images[0].url} name={user.display_name} />
            </View>
            <View>
                <ProfileStats followers={user.followers.total} numPlaylists={playlists.length} following={following.artists.items.length} />
            </View>
            <View>
              <View>
                <Text style={styles.topArtistsTitle}>Top Artists of All Time</Text>
              </View>
              <FlatList
                keyExtractor={item => item.id}
                horizontal={true}
                data={topArtists.items}
                renderItem={({item}) => {
                  return (
                    <View style={styles.artistFlatListItem}>
                      <View style={styles.artworkContainer}>
                        <Image style={styles.artwork} source={{uri: item.images[2].url}} />
                      </View>
                      <View>
                        <Text style={styles.artistName}>{item.name}</Text>
                      </View>
                    </View>
                  )
                }}
              />
            </View>
        </ScrollView>
      </View>
    );

};

const logout = async () => {
	AsyncStorage.removeItem('userData');
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
          onPress={() => {
						logout().then(() => {
              navData.navigation.navigate('Starter');
            });
          }}
        />
      </HeaderButtons>
    )
  };
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primaryBgColor,
		},
		centered: { 
				flex: 1, 
				justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primaryBgColor
    },
    artistFlatListItem: {
      alignItems: 'center',
      marginRight: 20
    },
    artwork: {
      width: '100%',
		  height: '100%'
    },
    topArtistsTitle: {
      color: '#fff',
      fontFamily: 'montserrat-bold',
      fontSize: 20,
      marginTop: 50,
      marginLeft: 10
    },
    artworkContainer: {
      width: 160,
      height: 160,
      borderRadius: 200,
      overflow: 'hidden',
      marginTop: 30
    },
    artistName: {
      color: '#fff',
      fontFamily: 'montserrat-semi-bold',
      paddingTop: 10
    }
});


export default ProfileScreen;