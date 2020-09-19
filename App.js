// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigation from './client/navigation/Navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-semi-bold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
  });
};


export default function App() {
  
  const [dataLoaded, setDataLoaded] = useState(false);


  
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
    
    return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
