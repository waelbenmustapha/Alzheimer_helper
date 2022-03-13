import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';
import CheckMyDemantiasLocation from './Src/Views/Guardian/CheckMyDemantiasLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Views/Home';
import Location from './Src/Views/Location';
import SignIn from './Src/Views/SignIn';

import SignupDementia from './Src/Views/Demantia/SignupDementia';
import IntroSliderScreen from './Src/Views/Guardian/IntroSliderScreen';
import Signup from './Src/Views/Guardian/Signup';
import IntroSlider from './Src/Views/Guardian/IntroSlider';
import SpecifySafeArea from './Src/Views/Guardian/SpecifySafeArea';
import PinCode from './Src/Views/Guardian/PinCode';
import AddNotes from './Src/Views/Note/AddNotes';
import CheckNotes from './Src/Views/Note/CheckNotes';

import CheckNote from './Src/Views/Note/CheckNote';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>        

        <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />

        <Stack.Screen name="IntroSlider" options={{ headerShown: false }} component={IntroSlider} />
        <Stack.Screen name="SpecifySafeArea" component={SpecifySafeArea} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />


        <Stack.Screen name="SignUpGuardian" component={Signup} />
        <Stack.Screen name="SignupDementia" component={SignupDementia} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} component={SignIn} />

        <Stack.Screen name="CheckNote" component={CheckNote} options={{ headerShown: false }} />
        <Stack.Screen name="CheckNotes" component={CheckNotes} />
        <Stack.Screen name="AddNote" component={AddNotes} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="PinCode" options={{headerShown: false}} component={PinCode}/>





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
