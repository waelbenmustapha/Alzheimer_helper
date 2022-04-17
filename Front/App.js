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
import PinCodeVerif from './Src/Views/Guardian/PinCodeVerif';
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
import VerifRegistration from './Src/Views/Verification/VerifRegistration';
import UpdateHistory from './Src/Views/History/UpdateHistory';
import ForgotPassword from './Src/Views/ForgotPassword';
import FVerificationCode from './Src/Views/FVerificationCode';
import FChangePassword from './Src/Views/FChangePassword';
import { getUserData } from './Src/Utils/user';

export default function App() {
  const [type, setType] = useState('');
  const [userData, setuserData] = useState('');

  const [int, setInt] = useState("");



  const [user, setUser] = useState("");

  useEffect(async () => {
    setUser(await getUserData());
  }, []);
  const Stack = createNativeStackNavigator();


if(user==''){
  return (<Text>Loading</Text>)
}
else{
  return (

    <NavigationContainer>
      <Stack.Navigator  initialRouteName={user == null ? "SignIn" : "drawer"} >
      <Stack.Screen name="SignUpGuardian" options={{ headerShown: false }} component={Signup} />

       <Stack.Screen name="drawer" options={{ headerShown: false }} component={DrawerNav}/>


     <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
          
       
       <Stack.Screen name="CheckPendingNote" options={{ headerShown: false }} component={CheckPendingNote }/>

       <Stack.Screen name="UpdatePendingNote" options={{ headerShown: false }} component={UpdatePendingNote }/>

   
       <Stack.Screen name="ForgotPassword" component={ForgotPassword}  />
       <Stack.Screen name="FVerificationCode" component={FVerificationCode}  />
       <Stack.Screen name="FChangePassword" component={FChangePassword}  />
       <Stack.Screen name="Home" component={Home}  />

      <Stack.Screen name="IntroSliderScreen" options={{ headerShown: false }} component={IntroSliderScreen} />
        <Stack.Screen name="IntroSlider" options={{ headerShown: false }} component={IntroSlider} />
   <Stack.Screen name="VerifRegistration" options={{ headerShown: false }} component={VerifRegistration}/>


   <Stack.Screen name="SignupDementia" options={{headerShow: false}} component={SignupDementia}/>



      <Stack.Screen name="Contact"options={{ headerShown: false }}  component={Contact} />

      <Stack.Screen name="PinCode"options={{ headerShown: false }}  component={PinCode} />
      <Stack.Screen name="PinCodeVerif"options={{ headerShown: false }}  component={PinCodeVerif} />

        
        <Stack.Screen name="Notif" options={{ headerShown: false }} component={Notif} />
        <Stack.Screen name="SpecifySafeArea" options={{ headerShown: false }} component={SpecifySafeArea} />
        <Stack.Screen name="AddNotes" options={{ title: 'Add Note' }} component={AddNotes} />
        <Stack.Screen name="CheckNote" options={{ title: 'Check Note' }} component={CheckNote} />
        <Stack.Screen name="CheckNotes" options={{ title: 'Notes' }} component={CheckNotes} />
        <Stack.Screen name="UpdateNote" options={{ headerShown: false }} component={UpdateNote} />
        <Stack.Screen name="DemantiaLocation" component={CheckMyLocation} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="CheckDemantiaLocation" component={CheckMyDemantiasLocation} />
        <Stack.Screen name="HistoryDementia" options={{ title: 'History' }} component={HistoryDementia} />
        <Stack.Screen name="AddHistoryDementia" options={{ title: 'Add History' }} component={AddHistoryDementia} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="UpdateHistory" options={{ title: 'UpdateHistory' }} component={UpdateHistory} />

      </Stack.Navigator>
    </NavigationContainer>


  )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
