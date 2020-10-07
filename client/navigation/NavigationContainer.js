import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Navigation from './Navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {autoRefreshLogin, refreshTokens} from '../../store/actions/auth';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => state.auth.accessToken);
  const refreshTokenAvail = useSelector(state => state.auth.refreshToken);
  const dispatch = useDispatch();

useEffect(() => {
  console.log('Inside NavigationContainer.js');

  if (isAuth == null) {
    navRef.current.dispatch(
      NavigationActions.navigate({ routeName: 'Auth' })
    );
  }

  if (isAuth == undefined && refreshTokenAvail !== undefined) {
    navRef.current.dispatch(
      NavigationActions.navigate({ routeName: 'Auth' })
    );
  }


    
  }, [isAuth]);

  return <Navigation ref={navRef} />;
};

export default NavigationContainer;
