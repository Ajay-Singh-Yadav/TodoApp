import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.plus}>＋</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 50,
    backgroundColor: '#3b82f6',
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    // alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    opacity: 0.95,
  },
  plus: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    //textAlign: 'center',
    alignSelf: 'center',
  },
});
