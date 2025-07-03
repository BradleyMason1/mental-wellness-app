// MoodSummaryScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodSummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Mood Summary</Text>
      <Text style={styles.placeholder}>
        📊 Mood trends and visual summaries will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center'
  }
});
