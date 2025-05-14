import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from '../screens/SettingsScreen';
import {useTheme} from '../redux/slice/ThemeContext';
import AddButton from '../components/AddButton';
import AddTodoScreen from '../screens/AddTodoScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const {isDark} = useTheme();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        initialRouteName="All Task"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'All Task') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === ' ') {
              iconName = focused ? 'calendar' : 'calendar';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDark ? '#fff' : '#000',
          tabBarInactiveTintColor: isDark ? '#888' : '#888',
          tabBarStyle: {
            height: 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: isDark ? '#000' : '#fff',
            position: 'absolute',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: {width: 0, height: -5},
            elevation: 10,
          },
        })}>
        <Tab.Screen name="All Task" component={HomeScreen} />
        <Tab.Screen
          name="AddTodoScreen"
          component={AddTodoScreen}
          options={({navigation}) => ({
            tabBarButton: () => (
              <AddButton onPress={() => navigation.navigate('AddTodoScreen')} />
            ),
            tabBarStyle: {display: 'none'}, // Optional: hide tab bar if needed
          })}
        />

        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
