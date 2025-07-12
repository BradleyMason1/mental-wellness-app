import { Platform } from 'react-native';

// Base URL for backend API
// On Android emulators, `localhost` refers to the emulator itself.
// 10.0.2.2 maps to the host machine running the server.
export const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';