import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Navigation from './Navigation';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.accessToken);

  useEffect(() => {
    console.log('Inside NavigationContainer')
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Starter' })
      );
    }

    if (isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Tabs' })
      );
    }

  }, [isAuth]);

  return <Navigation ref={navRef} />;

};

export default NavigationContainer;
