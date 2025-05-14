import React, {createContext, useState, useContext} from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  mode: 'light',
  background: '#fff',
  text: '#000',
};

export const darkTheme = {
  mode: 'dark',
  background: '#000',
  text: '#fff',
};

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
