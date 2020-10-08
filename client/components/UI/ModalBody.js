import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Modal } from 'react-native-paper';
import Colors from '../../constants/Colors';


const ModalBody = props => {

    return (
        <View style={styles.container}>
          <View style={styles.inner}>
            <Text>Hi</Text>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
        </View> 
    );
    

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  inner: {
  }

});


export default ModalBody;

