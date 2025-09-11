import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'cyber';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'cyber') => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

const THEME_STORAGE_KEY = 'ecomify_theme';

const themes = {
  light: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  cyber: {
    primary: '#00f5ff',
    secondary: '#ff0080',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#00f5ff',
    textSecondary: '#ff0080',
    border: '#00f5ff',
    accent: '#00ff88',
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0080',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'cyber'>('cyber');

  useEffect(() => {
    // Load theme from storage
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark', 'cyber'].includes(savedTheme)) {
          setThemeState(savedTheme as 'light' | 'dark' | 'cyber');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    // Save theme to storage
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };

    saveTheme();
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'cyber';
        case 'cyber':
          return 'light';
        default:
          return 'cyber';
      }
    });
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'cyber') => {
    setThemeState(newTheme);
  };

  const colors = themes[theme];

  const value = {
    theme,
    toggleTheme,
    setTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {children}
    </ThemeContext.Provider>
  );
}
