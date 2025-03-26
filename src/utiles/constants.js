import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

let MMKV;
let mmkvStorage = null;

// Initialize MMKV with proper error handling
const initializeMMKV = () => {
  try {
    const { MMKV } = require('react-native-mmkv');
    if (MMKV) {
      mmkvStorage = new MMKV();
      return true;
    }
  } catch (error) {
    console.warn('MMKV initialization failed:', error.message);
  }
  return false;
};

// Try to initialize MMKV
initializeMMKV();

// Create a storage interface that works with both MMKV and AsyncStorage
export const storage = {
  setItem: async (key, value) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      if (mmkvStorage) {
        mmkvStorage.set(key, stringValue);
      } else {
        await AsyncStorage.setItem(key, stringValue);
      }
      return true;
    } catch (error) {
      console.warn('Storage setItem error:', error);
      return false;
    }
  },
  getItem: async (key) => {
    try {
      if (mmkvStorage) {
        const value = mmkvStorage.getString(key);
        if (!value) return null;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      } else {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.warn('Storage getItem error:', error);
      return null;
    }
  },
  removeItem: async (key) => {
    try {
      if (mmkvStorage) {
        mmkvStorage.delete(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Storage removeItem error:', error);
    }
  }
};

// Helper methods for direct use
export const setItem = async (key, value) => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    if (mmkvStorage) {
      mmkvStorage.set(key, stringValue);
    } else {
      await AsyncStorage.setItem(key, stringValue);
    }
  } catch (error) {
    console.warn('setItem error:', error);
  }
};

export const getItem = async (key) => {
  try {
    if (mmkvStorage) {
      const value = mmkvStorage.getString(key);
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } else {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  } catch (error) {
    console.warn('getItem error:', error);
    return null;
  }
};

// Export environment variables
export const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY;