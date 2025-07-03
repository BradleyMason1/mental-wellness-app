// ReminderScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ReminderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Reminders</Text>
      <Text style={styles.text}>Feature to set daily mood log reminders will go here.</Text>
      <Button title="Set Reminder (placeholder)" onPress={() => alert('Reminder set!')} />
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
  text: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20
  }
});
