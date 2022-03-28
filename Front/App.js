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

import UpdateNote from './Src/Views/Note/UpdateNote';
import DrawerNav from './Src/Views/DrawerNav';
import History from './Src/Views/History';
import AddNotes from './Src/Views/Note/AddNotes';
import Contact from './Src/Views/Contact';
import ProfileGuardian from './Src/Views/ProfileGuardian';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import CheckPendingNote from './Src/Views/Note/CheckPendingNote';
import UpdatePendingNote from './Src/Views/Note/UpdatePendingNote';

export default function App() {
  const [type, setType] = useState('');
  const [userData, setuserData] = useState(null);
  const [token, setToken] = useState(null);





  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item))})
    AsyncStorage.getItem('token', (err, value) => { setToken(value)})
     
   
    


  }, []);
  const Stack = createNativeStackNavigator();


 

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName={[token==null?"IntroSliderScreen":userData==null?"SignIn":"drawer"]}>
       <Stack.Screen name="drawer" options={{ headerShown: false }} component={DrawerNav}/>
          
       <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />

       <Stack.Screen name="CheckPendingNote" options={{ headerShown: false }} component={CheckPendingNote }/>

       <Stack.Screen name="UpdatePendingNote" component={UpdatePendingNote }/>

   


        <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />
        <Stack.Screen name='IntroSlider' options={{ headerShown: false }} component={IntroSlider} />

      <Stack.Screen name="Home" component={Home}  />

      <Stack.Screen name="SignupDementia" component={SignupDementia} />


      <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />
        <Stack.Screen name="IntroSlider" options={{ headerShown: false }} component={IntroSlider} />
   <Stack.Screen name="SignUpGuardian" options={{ headerShown: false }} component={Signup} />

      <Stack.Screen name="Contact"options={{ headerShown: false }}  component={Contact} />

      <Stack.Screen name="PinCode"options={{ headerShown: false }}  component={PinCode} />
      <Stack.Screen name="PinCodeVerif"options={{ headerShown: false }}  component={PinCodeVerif} />

        
        <Stack.Screen name="Notif" options={{ headerShown: false }} component={Notif} />
        <Stack.Screen name="SpecifySafeArea"  component={SpecifySafeArea}  />
        <Stack.Screen name="AddNotes" options={{ headerShown: false }} component={AddNotes} />
        <Stack.Screen name="CheckNote" options={{ title: 'Check Note' }} component={CheckNote} />
        <Stack.Screen name="CheckNotes"  options={{ title: 'Notes' }} component={CheckNotes} />
        <Stack.Screen name="UpdateNote" options={{ headerShown: false }} component={UpdateNote} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="HistoryDementia" options={{ title: 'History' }} component={HistoryDementia}/>
        <Stack.Screen name="AddHistoryDementia" options={{ title: 'Add History' }} component={AddHistoryDementia}/>
        <Stack.Screen name="History" component={History}/>





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
