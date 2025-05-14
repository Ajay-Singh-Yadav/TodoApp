import React from 'react';
import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import {useTheme} from '../redux/slice/ThemeContext';

const SettingsScreen = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.text, {color: theme.text}]}>
        {theme.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
