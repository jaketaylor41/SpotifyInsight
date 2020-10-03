import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';


const ModalButton = props => {

    return <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.loginBtnText}>{props.children}</Text>
        </View> 
    </TouchableOpacity>

};

const styles = StyleSheet.create({

    button: {
        backgroundColor: Colors.green,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    loginBtnText: {
        color: '#ffffff',
        fontFamily: 'montserrat-semi-bold',
        fontSize: 12
    }

});


export default ModalButton;

