import { StyleSheet, Text, View } from 'react-native';
import CheckMyLocation from './Src/Views/Demantia/CheckMyLocation';
import CheckMyDemantiasLocation from './Src/Views/Guardian/CheckMyDemantiasLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Src/Views/Home';
import Location from './Src/Views/Location';
import SignIn from './Src/Views/SignIn';
import HistoryDementia from './Src/Views/History/HistoryDementia'
import AddHistoryDementia from './Src/Views/History/AddHistoryDementia'
import SignupDementia from './Src/Views/Demantia/SignupDementia';
import IntroSliderScreen from './Src/Views/Guardian/IntroSliderScreen';
import Signup from './Src/Views/Guardian/Signup';
import IntroSlider from './Src/Views/Guardian/IntroSlider';
import SpecifySafeArea from './Src/Views/Guardian/SpecifySafeArea';
import Notif, { registerForPushNotificationsAsync } from './Src/Utils/Notif';
import CheckNote from './Src/Views/Note/CheckNote';
import CheckNotes from './Src/Views/Note/CheckNotes';
import PinCode from './Src/Views/Guardian/PinCode';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateNote from './Src/Views/Note/UpdateNote';
import DrawerNav from './Src/Views/DrawerNav';
import History from './Src/Views/History';
import AddNotes from './Src/Views/Note/AddNotes';
import Contact from './Src/Views/Contact';
import PinCodeVerif from './Src/Views/Guardian/PinCodeVerif';
import ForgotPassword from './Src/Views/ForgotPassword';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');




  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />
        <Stack.Screen name='IntroSlider' options={{ headerShown: false }} component={IntroSlider} />
      <Stack.Screen name="drawer" options={{ headerShown: false }} component={DrawerNav} />
  
        <Stack.Screen name="SignUpGuardian" component={Signup} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="SignupDementia" component={SignupDementia} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: true }} component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen name="Contact" options={{ headerShown: false }} component={Contact} />
        <Stack.Screen name="Notif" options={{ headerShown: false }} component={Notif} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="CheckNote" component={CheckNote} options={{ headerShown: false }} />
        <Stack.Screen name="CheckNotes" component={CheckNotes} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateNote" component={UpdateNote} options={{ headerShown: false }} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="SpecifySafeArea" component={SpecifySafeArea} options={{ headerShown: false }} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="PinCode" options={{ headerShown: false }} component={PinCode} />
        <Stack.Screen name="PinCodeVerif" options={{ headerShown: false }} component={PinCodeVerif} />
        <Stack.Screen name="HistoryDementia" options={{ headerShown: false }} component={HistoryDementia} />
        <Stack.Screen name="AddHistoryDementia" options={{ headerShown: false }} component={AddHistoryDementia} />
        <Stack.Screen name="History" component={History} />





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
