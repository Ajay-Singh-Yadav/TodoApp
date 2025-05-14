import React from 'react';

import AppNavigation from './src/Navigation/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import {ThemeProvider} from './src/redux/slice/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigation />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
