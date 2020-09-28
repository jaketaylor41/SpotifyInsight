import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const ProfileHeader = props => {
    
    return (
        <View style={styles.profileHeader}>
			<View style={styles.imageContainer}>
                <Image resizeMode={'cover'} style={styles.avatar} source={{uri: props.image}} alt="avatar" />
            </View>
            <View style={styles.name}>
                <Text style={styles.title}>{props.name}</Text>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

	profileHeader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	imageContainer: {
		borderRadius: 200,
		width: 170,
		height: 170,
		overflow: 'hidden',
		marginTop: 20
  },

  avatar: {
		width: '100%',
		height: '100%'
  },

  title: {
		textAlign: 'center',
		fontFamily: 'montserrat-bold',
		color: '#fff',
		paddingTop: 15,
		fontSize: 25
  },

});


export default ProfileHeader;
