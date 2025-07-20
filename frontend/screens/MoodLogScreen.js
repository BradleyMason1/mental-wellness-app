import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';

const moods = ['😄', '😐', '😕', '😣', '😫'];

export default function MoodLogScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSave = () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood before saving.');
      return;
    }

    // Normally you'd send this to your backend here
    console.log('Mood:', selectedMood);
    console.log('Note:', note);
    Alert.alert('Mood saved!', `Mood: ${selectedMood}\nNote: ${note}`);
    
    // Optional: reset
    setSelectedMood(null);
    setNote('');
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
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24
  },
  moodButton: {
    padding: 8
  },
  selectedMood: {
    backgroundColor: '#d0e8ff',
    borderRadius: 10
  },
  emoji: {
    fontSize: 32
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    minHeight: 80
  }
});
