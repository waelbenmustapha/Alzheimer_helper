import { StyleSheet, Text, View } from 'react-native';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';
import CheckMyDemantiasLocation from './Src/Views/Guardian/CheckMyDemantiasLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Views/Home';
import Location from './Src/Views/Location';
import SignIn from './Src/Views/SignIn';
import HistoryDementia from './Src/Views/Demantia/HistoryDementia'
import AddHistoryDementia from './Src/Views/Guardian/AddHistoryDementia'
import SignupDementia from './Src/Views/Demantia/SignupDementia';
import IntroSliderScreen from './Src/Views/Guardian/IntroSliderScreen';
import Signup from './Src/Views/Guardian/Signup';
import IntroSlider from './Src/Views/Guardian/IntroSlider';
import SpecifySafeArea from './Src/Views/Guardian/SpecifySafeArea';
import Notif, { registerForPushNotificationsAsync } from './Src/Utils/Notif';
import CheckNote from './Src/Views/Note/CheckNote';
import CheckNotes from './Src/Views/Note/CheckNotes';
import AddNotes from './Src/Views/Note/AddNotes';
import PinCode from './Src/Views/Guardian/PinCode';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import test from './Src/Views/Test';
import UpdateNote from './Src/Views/Note/UpdateNote';
import DrawerNav from './Src/Views/DrawerNav';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');



  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />

      <Stack.Screen name="drawer" options={{ headerShown: false }} component={DrawerNav} />


      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

      <Stack.Screen name="SignupDementia" component={SignupDementia} />


      <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />



      <Stack.Screen name="test" options={{ headerShown: false }} component={test} />



      <Stack.Screen name="Notif" options={{ headerShown: false }} component={Notif} />


        <Stack.Screen name="SpecifySafeArea" component={SpecifySafeArea} options={{ headerShown: false }} />
        <Stack.Screen name="AddNotes" component={AddNotes} />




        <Stack.Screen name="SignUpGuardian" component={Signup} />
        
        <Stack.Screen name="CheckNote" component={CheckNote} options={{ headerShown: false }} />
        <Stack.Screen name="CheckNotes" component={CheckNotes} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateNote" component={UpdateNote} options={{ headerShown: false }} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="PinCode" options={{ headerShown: false }} component={PinCode}/>
        <Stack.Screen name="HistoryDementia" options={{ headerShown: false }} component={HistoryDementia}/>
        <Stack.Screen name="AddHistoryDementia" options={{ headerShown: false }} component={AddHistoryDementia}/>





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
