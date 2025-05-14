import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AddTodoButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
      <Text style={styles.addText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddTodoButton;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
