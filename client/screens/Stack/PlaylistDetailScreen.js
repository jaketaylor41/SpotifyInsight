import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Colors from '../../constants/Colors';

import { useSelector, useDispatch } from 'react-redux';
import { getTrackFeatures, getTrack } from '../../../store/actions/spotifyData';

import PlaylistDetail from '../../components/PlaylistDetail/PlaylistDetail';
import { ScrollView } from 'react-native-gesture-handler';
import PlaylistDetailHeader from '../../components/PlaylistDetail/PlaylistDetailHeader';


const PlaylistDetailScreen = props => {
  const playlistId = props.navigation.getParam('playlistId');
  const selectedPlaylist = useSelector(state => 
    state.spotifyData.playlists.find(playlist => playlist.id === playlistId)
    );
  const playlist = useSelector(state => state.spotifyData.playlist);
  const dispatch = useDispatch();

  const selectTrackHandler = async (id) => {
    await dispatch(getTrackFeatures(id));
    await dispatch(getTrack(id));
    props.navigation.navigate('Track');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <PlaylistDetailHeader
        playlistImage={playlist.images[0].url}
        playlistTitle={playlist.name}
        followers={playlist.followers.total}
        creator={playlist.owner.display_name}
        playUri={playlist.external_urls.spotify}
      />
      {playlist.tracks.items.map((item, i) => {
        return (
          <PlaylistDetail
            key={i}
            image={item.track.album.images[2].url}
            title={item.track.name}
            artist={item.track.artists[0].name}
            onSelect={() => {
              selectTrackHandler(item.track.id)
            }}
          />
        );
      })}
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primaryBgColor
	},
});


export default PlaylistDetailScreen;