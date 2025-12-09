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
import api from '../services/api.js';

export default function EditEventScreen({ route, navigation }) {
  const { event } = route.params;

  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [organizer, setOrganizer] = useState(event.organizer || '');

  const handleUpdate = async () => {
    if (!title || !date || !location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    try {
      const updatedEvent = { title, date, location, description, organizer };
      await api.put(`/events/${event.id}/`, updatedEvent);

      Alert.alert("Success", "Event updated successfully!", [
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      console.error("Update Error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update event";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header Background (Matches Detail Screen) */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Edit Event</Text>
        </View>

        {/* 2. Floating Form Card */}
        <View style={styles.card}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Annual Meetup"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            {/* Using a Row to save vertical space if needed, or keep stacked */}
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
              <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="2024-01-01"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. Conference Hall A"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Organizer</Text>
            <TextInput
              style={styles.input}
              value={organizer}
              onChangeText={setOrganizer}
              placeholder="e.g. Student Council"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter event details..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* 3. Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  
  // Header
  headerBackground: {
    backgroundColor: '#4A90E2', // Blue theme
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

  // Card
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -40, // Pulls card up over header
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Inputs
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
    backgroundColor: '#F4F6F8', // Soft grey background
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: 'transparent', // Looks cleaner than a hard border
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },

  // Buttons
  buttonContainer: {
    marginTop: 10,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: '#636E72',
    fontSize: 16,
    fontWeight: '600',
  },
});