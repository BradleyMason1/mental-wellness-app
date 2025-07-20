import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../utils/api';

export default function MoodHistoryScreen() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem('token'); // Gets token from local storage
      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/moods`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setMoods(data);
      } catch (err) {
        console.error('Failed to fetch moods:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <Text style={styles.emoji}>{item.mood}</Text>
      <View style={styles.details}>
        <Text style={styles.note}>{item.note || 'No note provided'}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loading}>Loading mood history...</Text>;
  }

  if (!moods.length) {
    return <Text style={styles.loading}>No mood entries yet.</Text>;
  }

  return (
    <FlatList
      data={moods}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  entry: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  note: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  loading: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },
});
