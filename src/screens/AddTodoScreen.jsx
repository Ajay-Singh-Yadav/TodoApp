import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/slice/todoSlice';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../redux/slice/ThemeContext';

const AddTodoScreen = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isDark = useTheme();

  const handleAddTask = () => {
    if (taskText.trim() === '') return;

    dispatch(addTask(taskText));
    setTaskText('');
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={[styles.input, {color: isDark ? '#333' : '#fff'}]}
        placeholder="What do you want to do?"
        placeholderTextColor={isDark ? '#333' : '#fff'}
        value={taskText}
        onChangeText={setTaskText}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
