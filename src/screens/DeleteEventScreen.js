import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api.js';


export default function DeleteEventScreen({ route, navigation }) {
  // Get the event data passed from the previous screen
  const { event } = route.params;

  const handleConfirmDelete = async () => {
    try {
      console.log(`Deleting event ID: ${event.id}`);

      // 1. Send the DELETE request to the backend
      // Ensure the URL matches your Django URL pattern (usually requires a trailing slash)
      await api.delete(`/events/${event.id}/`);

      Alert.alert("Deleted", "The event has been permanently removed.", [
        {
          text: "OK",
          onPress: () => {
            // 2. Navigate back to Home to refresh the list
            // Using 'reset' or 'navigate' ensures you don't go back to a deleted event
            navigation.navigate("Home"); 
          }
        }
      ]);

    } catch (error) {
      console.error("Delete Error:", error);
      const errorMessage = error.response?.data?.detail || "Failed to delete event. Please check your connection.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.warningTitle}>⚠ Delete Event?</Text>
        <Text style={styles.warningText}>
          Are you sure you want to delete this event? This action cannot be undone.
        </Text>

        <View style={styles.card}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetail}>📅 {event.date}</Text>
          <Text style={styles.eventDetail}>📍 {event.location}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        {/* Confirm Delete Button */}
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleConfirmDelete}
        >
          <Text style={styles.deleteText}>Confirm Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between', // Pushes buttons to bottom
  },
  content: {
    alignItems: 'center',
    paddingTop: 40,
  },
  warningTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d9534f', // Warning Red
    marginBottom: 10,
  },
  warningText: {
    fontSize: 16,
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#d9534f',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  eventDetail: {
    fontSize: 16,
    color: '#000000ff',
    marginBottom: 5,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});