import { createContext } from 'react';

const ThemeContext = createContext({
  theme: 'light-theme',
  toggleTheme: () => {}
});

export default ThemeContext; 