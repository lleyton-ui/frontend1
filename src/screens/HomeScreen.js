import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events/');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Better Empty State Component
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No events found yet.</Text>
      <Text style={styles.emptySubText}>Create one to get started!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 2. Custom Styled Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddEvent')}
        >
          <Text style={styles.addButtonText}>+ Add Event</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }} // Adds scroll padding at bottom
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('EventDetail', { event: item })} 
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {/* Optional: Add a status badge or icon here */}
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.cardDate}>📅 {item.date}</Text>
                <Text style={styles.cardLocation}>📍 {item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#4A90E2' // Modern light blue-grey background
  },

  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },

  // Button Styles (Replaces the default <Button>)
  addButton: {
    backgroundColor: '#0b3c6dff', // Professional primary blue
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // Card Styles
  card: { 
    backgroundColor: 'white', 
    padding: 20, 
    marginBottom: 16, 
    borderRadius: 16, 
    // Smooth soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, // Android shadow
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)'
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#2D3436',
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: 'column', // Stack date/location
    gap: 6, // Works in newer RN versions (or use marginBottom on text)
  },
  cardDate: {
    fontSize: 14,
    color: '#000000ff',
    fontWeight: '500',
  },
  cardLocation: {
    fontSize: 14,
    color: '#000000ff',
  },

  // Empty State Styles
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000ff',
  },
  emptySubText: {
    fontSize: 14,
    color: '#000000ff',
    marginTop: 5,
  }
});