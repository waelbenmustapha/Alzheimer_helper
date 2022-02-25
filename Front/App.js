import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AddNotes from './Src/Views/AddNotes';
import CheckNotes from './Src/Views/CheckNotes';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';
import CheckMyDemantiasLocation from './Src/Views/Guardian/CheckMyDemantiasLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Views/Home';
import CheckNote from './Src/Views/CheckNote';
import Location from './Src/Views/Location';
import SignupDementia from './Src/Views/Demantia/SignupDementia';
import SigninDementia from './Src/Views/Demantia/SigninDementia';
import SignIn from './Src/Views/Guardian/SignIn';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="SignInGuardian" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CheckNotes" component={CheckNotes} />
        <Stack.Screen name="CheckNote" component={CheckNote} />
        <Stack.Screen name="AddNote" component={AddNotes} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="Location" component={Location} />


        
        <Stack.Screen name="SignupDementia" component={SignupDementia}/>
        <Stack.Screen name="SigninDementia" component={SigninDementia}/>


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
