import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;

  // Safety check
  if (!event || !event.id) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event data not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Decorative Header Background */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Event Details</Text>
        </View>

        {/* 2. Main Content Card */}
        <View style={styles.card}>
          
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>📅 {event.date}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Details Section */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>📍 Location</Text>
            <Text style={styles.value}>{event.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>👤 Organizer</Text>
            <Text style={styles.value}>{event.organizer}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>📝 Description</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditEvent', { event })}
            >
              <Text style={styles.editButtonText}>Edit Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.6}
              // Keeping your logic to navigate to a delete screen
              onPress={() => navigation.navigate('DeleteEvent', { event })}
            >
              <Text style={styles.deleteButtonText}>Delete Event</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Light grey background for the whole screen
  },
  scrollContent: {
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Header Styling
  headerBackground: {
    backgroundColor: '#4A90E2', // Nice blue header
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: -40, // Pull text up slightly
  },

  // Card Styling
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -50, // This pulls the card UP over the blue header
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  
  // Typography
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateBadge: {
    backgroundColor: '#E3F2FD', // Very light blue pill
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    color: '#1976D2',
    fontWeight: '600',
    fontSize: 14,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },

  // Info Rows
  infoRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#000000ff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24, // Better readability for long text
    fontWeight: '500',
  },

  // Buttons
  buttonContainer: {
    marginTop: 30,
    gap: 15, // Adds space between buttons
  },
  editButton: {
    backgroundColor: '#4A90E2', // Matches header
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF5252',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '600',
  },
});