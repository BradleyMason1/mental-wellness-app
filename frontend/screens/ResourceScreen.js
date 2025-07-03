// ResourceScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodLogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resources Screen - To be implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});