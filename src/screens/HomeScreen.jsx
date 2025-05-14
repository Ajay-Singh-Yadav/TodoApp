import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
} from '../redux/slice/todoSlice';
import axios from 'axios';
import {setAdditionalTasks} from '../redux/slice/todoSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../redux/slice/ThemeContext';

export default function HomeScreen() {
  const {isDark} = useTheme();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const {tasks, filter, additionalTasks} = useSelector(state => state.todos);

  const filteredTasks =
    filter === 'Additional Tasks'
      ? additionalTasks
      : tasks.filter(task =>
          filter === 'All'
            ? true
            : filter === 'Completed'
            ? task.completed
            : !task.completed,
        );
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/todos?_limit=5',
        );
        const apiTasks = response.data.todos.map(todo => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
        }));
        dispatch(setAdditionalTasks(apiTasks));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <View style={{padding: 20}}>
      <View style={styles.container}>
        <Text style={styles.title}>My Tasks</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        {['All', 'Completed', 'Pending', 'Additional Tasks'].map(f => (
          <TouchableOpacity
            style={styles.filter}
            key={f}
            onPress={() => dispatch(setFilter(f))}>
            <Text style={{fontWeight: filter === f ? 'bold' : 'normal'}}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {additionalTasks.length > 0 && (
        <View style={{marginTop: 20}}>
          <Text
            style={[styles.suggestionTitle, {color: isDark ? '#fff' : '#000'}]}>
            Suggestions From API{' '}
          </Text>
          <FlatList
            data={additionalTasks}
            horizontal
            keyExtractor={item => item.id.toString()}
            style={{marginBottom: 60}}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text style={[styles.suggestionText]}>{item.text}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              borderBottomWidth: 0.5,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => dispatch(toggleTask(item.id))}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderWidth: 2,
                  borderColor: '#007bff',
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  backgroundColor: item.completed ? '#007bff' : '#fff',
                }}>
                {item.completed && (
                  <FontAwesome name="check" size={16} color="#fff" />
                )}
              </View>

              <Text
                style={[
                  styles.todoText,
                  {
                    color: item.completed
                      ? isDark
                        ? '#666'
                        : '#ccc'
                      : isDark
                      ? '#fff'
                      : '#333',
                  },
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(deleteTask(item.id))}
              style={{margin: 15}}>
              <MaterialCommunityIcons
                name="delete"
                size={26}
                style={{
                  color: item.completed
                    ? isDark
                      ? '#666'
                      : '#ccc'
                    : isDark
                    ? '#fff'
                    : '#333',
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // 3D shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  todoText: {
    fontSize: 20,
  },
  filter: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  suggestionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },

  card: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 190,
    height: 100,
    justifyContent: 'space-between',
  },

  suggestionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});
