import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,

} from 'react-native';
import { API_BASE_URL } from '../utils/api';
import { isValidEmail, isValidPassword } from '../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Added to store login token
import loginBackground from '../assets/images/loginscreenbackground.png';


export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Password Too Short', 'Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Save the token to AsyncStorage if login is successful
      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token); // store the token
        console.log('Saved token:', data.token);
        onLogin();
      } else {
        Alert.alert('Login Failed', data.message || 'Incorrect credentials.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to reach the server.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={loginBackground} style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 12 }]}

              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {__DEV__ && (
              <TouchableOpacity
                style={[styles.button, { marginTop: 12 }]}
                onPress={onLogin}
              >
                <Text style={styles.buttonText}>Dev: Skip Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
   height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',

  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    width: '30%',
    alignSelf: 'center',     // horizontally center within parent
    marginVertical: 10       // spacing above/below
  },

    buttonGroup: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    width: '20%',
    alignSelf: 'center',     // horizontally center within parent
    marginVertical: 10       // spacing above/below

  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
});
