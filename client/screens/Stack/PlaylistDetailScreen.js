import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Colors from '../../constants/Colors';

import { useSelector } from 'react-redux';
import PlaylistDetail from '../../components/PlaylistDetail/PlaylistDetail';
import { ScrollView } from 'react-native-gesture-handler';


const PlaylistDetailScreen = props => {
  const playlistId = props.navigation.getParam('playlistId');
  const selectedPlaylist = useSelector(state => 
    state.spotifyData.playlists.find(playlist => playlist.id === playlistId)
    );
  const playlist = useSelector(state => state.spotifyData.playlist);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
      {playlist.items.map((item, i) => {
        return (
          <PlaylistDetail
            image={item.images[2].url}
            title={item.name}
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