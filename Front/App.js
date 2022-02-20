import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CheckNotes from './Src/Views/CheckNotes';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';
import CheckMyDemantiasLocation from './Src/Views/Guardian/CheckMyDemantiasLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Views/Home';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
<NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />

<Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
<Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
