import React from 'react';
import { LinearGradient, Stop, Defs } from 'react-native-svg';


export const convertDuration = (ms) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export const Gradient = () => (
  <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
          <Stop offset={'0%'} stopColor={'rgba(30, 215, 96)'}/>
          <Stop offset={'100%'} stopColor={'rgba(28, 28, 28)'}/>
      </LinearGradient>
  </Defs>
);




export const convertPitch = (note) => {
    let key = note;
  
    switch (note) {
      case 0:
        key = 'C';
        break;
      case 1:
        key = 'D♭';
        break;
      case 2:
        key = 'D';
        break;
      case 3:
        key = 'E♭';
        break;
      case 4:
        key = 'E';
        break;
      case 5:
        key = 'F';
        break;
      case 6:
        key = 'G♭';
        break;
      case 7:
        key = 'G';
        break;
      case 8:
        key = 'A♭';
        break;
      case 9:
        key = 'A';
        break;
      case 10:
        key = 'B♭';
        break;
      case 11:
        key = 'B';
        break;
      default:
        return null;
    }
  
    return key;
  };