import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {darkColors, lightColors, ThemeColors} from '../../config/theme/theme';
import {Appearance, AppState, useColorScheme} from 'react-native';

type ThemeColor = 'light' | 'dark';

interface ThemeContextProps {
  currentTheme: ThemeColor;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeColor) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(
    colorScheme as ThemeColor,
  );

  const setTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
  };

  // Cambiar el tema según el sistema operativo
  useEffect(() => {
    console.log({colorScheme});
    setCurrentTheme(colorScheme as ThemeColor);
  }, [colorScheme]);

  // Cambiar el tema según el estado de la aplicación en el dispositivo
  // Si la aplicación está activa, inactiva o en segundo plano
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const colorScheme = Appearance.getColorScheme();
      setCurrentTheme(colorScheme as ThemeColor);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        colors: currentTheme === 'light' ? lightColors : darkColors,
        isDark: currentTheme === 'dark',
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
