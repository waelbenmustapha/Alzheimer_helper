import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar, BackHandler, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

import 'react-native-gesture-handler';
import Home from './Home';
import ProfileGuardian from './ProfileGuardian';
import CheckPendingNotes from './Note/CheckPendingNotes';

const Drawer = createDrawerNavigator();

const DrawerNav = ({ navigation }) => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  


  const Logout = () => {
    try {
       AsyncStorage.clear()
      navigation.push("SignIn")


    } catch(e) {
      console.log(e) 
    
     }
  
    console.log('Done.')
  }  
  useEffect(() => {
    // // const backAction = () => {
    // //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    // //     {
    // //       text: 'Cancel',
    // //       onPress: () => null,
    // //       style: 'cancel',
    // //     },
    // //     { text: 'YES', onPress: () => BackHandler.exitApp() },
    // //   ]);
    // //   return true;
    // // };

    // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // return () => backHandler.remove();
  }, []);

    
  return (
   
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() =>Logout() } />
        </DrawerContentScrollView>
      )
    }}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="ProfileGuardian" component={ProfileGuardian} />
    <Drawer.Screen name="CheckPendingNotes" component={CheckPendingNotes} />

    {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    }});
export default DrawerNav