import React from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ModalBody = props => {

  const DATA = [
    {
      id: '1',
      title: 'Key',
      description: 'The estimated overall key of the track.'
    },
    {
      id: '2',
      title: 'Mode',
      description: 'Indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.'
    },
    {
      id: '3',
      title: 'Time Signature',
      description: 'An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar.'
    },
    {
      id: '4',
      title: 'Acousticness',
      description: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.'
    },
    {
      id: '5',
      title: 'Danceability',
      description: 'Describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.'
    },
    {
      id: '6',
      title: 'Energy',
      description: 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.'
    },
    {
      id: '7',
      title: 'Instrumentalness',
      description: 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.'
    },
    {
      id: '8',
      title: 'Liveness',
      description: 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.'
    },
    {
      id: '9',
      title: 'Loudness',
      description: 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.'
    },
    {
      id: '10',
      title: 'Speechiness',
      description: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.'
    },
    {
      id: '11',
      title: 'Valence',
      description: 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
    },
    {
      id: '12',
      title: 'Tempo',
      description: 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.'
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.image} source={require('../../../assets/images/SpotifyLogo-Green.png')} />
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={props.onCancel}>
            <View>
              <Ionicons name={Platform.OS === 'android' ? 'md-close-circle-outline' : 'ios-close-circle-outline'} size={28} color="red" />
            </View>
          </TouchableOpacity>
        </View>
          <View style={styles.modalBodyWrapper}>
            <FlatList
              data={DATA}
              renderItem={({item}) => {
                return (
                  <View style={styles.listContainer}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>
      </View>
  );
};

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    maxHeight: screenHeight
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeBtn: {
    width: '45%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 25,
    marginTop: 20
  },
  imageContainer: {
    width: '55%',
    alignSelf: 'flex-start',
    height: 110,
    paddingLeft: 10
  },
  image: {
    width: '100%',
    height: '100%'
  },
  modalBodyWrapper: {
    height: '80%'
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  titleContainer: {
    width: '50%',
    justifyContent: 'center'
  },
  descriptionContainer: {
    width: '50%',
  },
  title: {
    fontFamily: 'montserrat-semi-bold'
  },
  description: {
    fontFamily: 'montserrat-regular'
  }

});


export default ModalBody;

