import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Imports
import AddEventScreen from './src/screens/AddEventScreen';
import DeleteEventScreen from './src/screens/DeleteEventScreen';
import EditEventScreen from './src/screens/EditEventScreen';
import EventDetailScreen from './src/screens/EventDetailScreen'; // <--- NEW IMPORT
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'University of the Assumption Events' }} 
        />
        <Stack.Screen 
          name="AddEvent" 
          component={AddEventScreen} 
          options={{ title: 'Create Event' }} 
        />
        {/* NEW SCREEN ADDED HERE */}
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen} 
          options={{ title: 'Event Details' }} 
        />
        <Stack.Screen 
          name="EditEvent" 
          component={EditEventScreen} 
          options={{ title: 'Edit Event' }} 
        />
        <Stack.Screen 
          name="DeleteEvent" 
          component={DeleteEventScreen} 
          options={{ title: 'Confirm Delete' }} 
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}