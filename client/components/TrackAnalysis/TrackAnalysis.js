import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions  } from 'react-native';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import Colors from '../../constants/Colors';

const TrackAnalysis = props => {

	const deviceWidth = Dimensions.get('window');
	const labelArr = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'];


    return (
			<View style={styles.container}>
				<YAxis data={props.data} style={{ marginBottom: 30, paddingRight: 5, paddingLeft: 5 }} contentInset={{top: 10, bottom: 10}} svg={{fontSize: 10, fill: 'grey'}} />
				<BarChart
					style={{ flex: 1 }}
					data={props.data}
					contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
					yAccessor={({ item }) => item}
					svg={{ fill: 'rgb(134, 65, 244)' }}
					width={deviceWidth}
				>
				<XAxis
					style={{}}
					data={labelArr}
					formatLabel={(index) => labelArr[index]}
					contentInset={{ left: 30, right: 30, }}
					svg={{ fontSize: 10, fill: '#000'}}
				/>
					
				<Grid direction={Grid.Direction.BOTH}/>
				</BarChart>
			
			</View>
    );

};


const styles = StyleSheet.create({

	container: {
		height: 300,
		flexDirection: 'row',
		backgroundColor: '#fff'
	}

});


export default TrackAnalysis;
