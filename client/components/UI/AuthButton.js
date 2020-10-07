import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';


const LoginButton = props => {

    return <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.loginBtnText}>{props.children}</Text>
        </View> 
    </TouchableOpacity>

};

const styles = StyleSheet.create({

    button: {
        backgroundColor: Colors.green,
        width: 230,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 20
    },
    loginBtnText: {
        color: '#ffffff',
        fontFamily: 'montserrat-semi-bold',
        fontSize: 15
    }

});


export default LoginButton;

