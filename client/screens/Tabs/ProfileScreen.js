import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, Text, StyleSheet, ActivityIndicator, Platform, RefreshControl } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

import { dispatchUser, getTrackFeatures, getArtistTopTracks, getPlaylist, getTrack, getArtist } from '../../../store/actions/spotifyData';

import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import HeaderButton from '../../components/UI/HeaderButton';
import TopArtists from '../../components/Profile/TopArtists';
import TopTracks from '../../components/Profile/TopTracks';
import Playlists from '../../components/Profile/Playlists';



const ProfileScreen = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.spotifyData.user);
    const playlists = useSelector(state => state.spotifyData.playlists);
    const following = useSelector(state => state.spotifyData.following);
    const topArtists = useSelector(state => state.spotifyData.topArtists);
    const topTracks = useSelector(state => state.spotifyData.topTracks);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);


    const loadUserProfile = useCallback(async () => {
      let mounted = true;
      console.log('PROFILE TAB LOADED');
      setisRefreshing(true);
      try {
        if (mounted) {
          await dispatch(dispatchUser());
        }
      } catch (err) {
        if (mounted) {
          console.log(err);
        }
      }
      setisRefreshing(false);
      return () => {
        mounted = false
      }
    }, [dispatch, setisRefreshing]);

    useEffect(() => {
      let mounted = true;
      setIsLoading(true);
      if (mounted) {
        loadUserProfile().then(() => {
            setIsLoading(false);
        });
      }
      return () => {
        console.log('unmounted')
        mounted = false;
      }
    }, [dispatch, loadUserProfile]);
    

    const selectArtistHandler = async (id) => {
      await dispatch(getArtistTopTracks(id));
      await dispatch(getArtist(id));
      props.navigation.navigate('Artist', {
        artistId: id
      });
    };

    const selectTrackHandler = async (id) => {
      await dispatch(getTrackFeatures(id));
      await dispatch(getTrack(id));
      props.navigation.navigate('Track');
    };

    const selectPlaylistHandler = async (playlistId) => {
      await dispatch(getPlaylist(playlistId));
      props.navigation.navigate('Playlist', {
        playlistId: playlistId
      });
    };
		

		if (isLoading) {
			return (
				<View style={styles.centered}>
					<ActivityIndicator size="small" />
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
      <SafeAreaView style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} style={styles.screen}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
          refreshControl={
            <RefreshControl tintColor={Colors.green} refreshing={isRefreshing} onRefresh={loadUserProfile} />
          }
        >
            <View>
              <ProfileHeader image={user.images[0].url} name={user.display_name} />
            </View>
            <View>
              <ProfileStats followers={user.followers.total} numPlaylists={playlists.length} following={following.artists.items.length} />
            </View>
            <View>
            <View style={styles.titleContainer}>
						  <Text style={styles.profileTitles}> Your Top Artists of All Time</Text>
				    </View>
              <FlatList
                keyExtractor={item => item.id}
                contentContainerStyle={{marginLeft: 12, marginTop: 20}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topArtists.items}
                renderItem={({item}) => {
                  return (
                    <TopArtists image={item.images[0].url} name={item.name} onSelect={() => {
                      selectArtistHandler(item.id);
                    }} />
                  );
                }}
              />
            </View>
            <View>
            <View style={styles.titleContainer}>
						  <Text style={styles.profileTitles}> Your Top Tracks of All Time</Text>
				    </View>
            <FlatList
                keyExtractor={item => item.id}
                contentContainerStyle={{marginLeft: 12, marginTop: 20}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topTracks.items}
                renderItem={({item}) => {
                  return (
                    <TopTracks image={item.album.images[0].url} name={item.name} onSelect={() => {
                      selectTrackHandler(item.id);
                    }} />
                  )
                }}
            />
            </View>
              <View style={styles.titleContainer}>
                <Text style={styles.profileTitles}>Your Playlists</Text>
              </View>
            <ScrollView contentContainerStyle={{marginLeft: 12, marginTop: 20}}>
              {playlists.map((item, i) => {
                return (
                  <Playlists key={i} image={item.images[0].url} title={item.name} totalSongs={item.tracks.total}
                    onSelect={() => {
                      selectPlaylistHandler(item.id);
                    }}
                  />
                )
              })}
            </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );

};

ProfileScreen.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
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
    titleContainer: {
      marginTop: 50,
    },
    profileTitles: {
      color: '#fff',
      fontFamily: 'montserrat-bold',
      fontSize: 20,
      marginLeft: 12
    }
});


export default ProfileScreen;