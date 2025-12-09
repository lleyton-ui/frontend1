import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../services/api';

export default function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');

  const handleSubmit = async () => {
    // Basic validation to prevent empty submissions
    if (!title || !date) {
      Alert.alert('Missing Info', 'Please enter at least a Title and Date.');
      return;
    }

    console.log('Submitting:', { title, date, location, description, organizer });
    
    try {
      await api.post('/events/', {
        title,
        date,
        location,
        description,
        organizer
      });
      
      Alert.alert('Success', 'Event Created Successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not save event. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header Background */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Create New Event</Text>
        </View>

        {/* 2. Floating Form Card */}
        <View style={styles.card}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              placeholder="e.g. Science Fair 2024"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="2024-12-25"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={setDate}
              value={date}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              placeholder="e.g. Main Auditorium"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={setLocation}
              value={location}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Organizer</Text>
            <TextInput
              placeholder="e.g. Student Body"
              placeholderTextColor="#999"
              style={styles.input}
              onChangeText={setOrganizer}
              value={organizer}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="What is this event about?"
              placeholderTextColor="#999"
              style={[styles.input, styles.textArea]}
              onChangeText={setDescription}
              value={description}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* 3. Custom Action Button */}
          <TouchableOpacity 
            style={styles.createButton} 
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.createButtonText}>Save Event</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Consistent light grey background
  },
  scrollContent: {
    paddingBottom: 30,
  },

  // Header Styling
  headerBackground: {
    backgroundColor: '#4A90E2', // Primary Blue
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -30,
  },

  // Card Styling
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -40, // Pull up over header
    borderRadius: 16,
    padding: 24,
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Input Fields
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F4F6F8', // Light grey input background (modern look)
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#2D3436',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensures text starts at top-left
  },

  // Button Styling
  createButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});