import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions  } from 'react-native';

const FeaturesGrid = props => {

    return (
			<View style={styles.container}>
				<View style={styles.cell}>
					<Text style={styles.featureTitle}>Duration</Text>
					<Text style={styles.feature}>{props.duration}</Text>
				</View>
				<View style={styles.cell}>
					<Text style={styles.featureTitle}>Key</Text>
					<Text style={styles.feature}>{props.trackKey}</Text>
				</View>
				<View style={styles.cell}>
					<Text style={styles.featureTitle}>Modality</Text>
					<Text style={styles.feature}>{props.mode}</Text>
				</View>
				<View style={styles.cell}>
					<Text style={styles.featureTitle}>Time Sig</Text>
					<Text style={styles.feature}>{props.timeSig}</Text>
				</View>
				<View style={styles.lastCell}>
					<Text style={styles.featureTitle}>Tempo</Text>
					<Text style={styles.feature}>{props.tempo}</Text>
				</View>
			</View>
    );

};

const styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 50
	},
	cell: {
		flex: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderRightColor: 'rgba(255, 255, 255, 0.8)',
		borderBottomColor: 'rgba(255, 255, 255, 0.8)',
		paddingRight: 5,
		paddingLeft: 5
	},
	lastCell: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.8)'
	},
	featureTitle: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'montserrat-semi-bold',
		fontSize: 15,
		marginBottom: 5
	},
	feature: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'montserrat-regular',
		fontSize: 13
	}

});


export default FeaturesGrid;
