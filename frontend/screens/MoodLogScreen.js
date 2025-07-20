import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { API_BASE_URL } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moods = ['😄', '🙂', '😐', '😕', '😣'];

export default function MoodLogScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [token, setToken] = useState(null);

  // ✅ Load token from local storage when component mounts
  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      } else {
        Alert.alert('Not logged in', 'Please log in to save moods.');
      }
    };
    fetchToken();
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood before saving.');
      return;
    }

    if (!token) {
      Alert.alert('Authentication Required', 'Please log in first.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/moods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood,
          note: note,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Mood saved!', `Mood: ${selectedMood}\nNote: ${note}`);
        setSelectedMood(null);
        setNote('');
      } else {
        const error = await response.json();
        Alert.alert('Error', error?.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Network Error', 'Failed to connect to server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodRow}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMoodSelect(mood)}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
          >
            <Text style={styles.emoji}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.noteInput}
        multiline
      />
      <Button title="SAVE MOOD" onPress={handleSave} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  moodButton: {
    padding: 8,
  },
  selectedMood: {
    backgroundColor: '#d0e8ff',
    borderRadius: 10,
  },
  emoji: {
    fontSize: 32,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    minHeight: 80,
  },
});
