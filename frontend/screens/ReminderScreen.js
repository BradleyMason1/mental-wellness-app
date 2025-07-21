// ReminderScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function ReminderScreen() {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    loadSettings();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications not granted!');
    }
  };

  const loadSettings = async () => {
    const savedTime = await AsyncStorage.getItem('reminderTime');
    const savedEnabled = await AsyncStorage.getItem('reminderEnabled');
    if (savedTime) setTime(new Date(savedTime));
    if (savedEnabled !== null) setReminderEnabled(savedEnabled === 'true');
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('reminderTime', time.toString());
    await AsyncStorage.setItem('reminderEnabled', reminderEnabled.toString());
    if (reminderEnabled) {
      scheduleNotification();
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
    alert('Reminder settings saved!');
  };

  const scheduleNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const trigger = new Date(time);
    if (trigger < new Date()) {
      trigger.setDate(trigger.getDate() + 1); // Schedule for next day if time has passed
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Mood Log Reminder',
        body: 'Don’t forget to log your mood today!',
      },
      trigger: {
        hour: trigger.getHours(),
        minute: trigger.getMinutes(),
        repeats: true,
      },
    });
  };

  const onTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Reminders</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Reminder</Text>
        <Switch value={reminderEnabled} onValueChange={setReminderEnabled} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Reminder Time</Text>
        <Button title={time.toLocaleTimeString()} onPress={() => setShowPicker(true)} />
      </View>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
});