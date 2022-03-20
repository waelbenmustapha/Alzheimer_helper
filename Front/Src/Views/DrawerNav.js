import { View, Text,Button, StyleSheet,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

import 'react-native-gesture-handler';
import Home from './Home';

const Drawer = createDrawerNavigator();

const DrawerNav = ({ navigation }) => {
  const Logout = () => {
    try {
       AsyncStorage.removeItem("user")
      navigation.navigate("Signin")

    } catch(e) {
      console.log(e) 
    
     }
  
    console.log('Done.')
  }   

  
  return (
   
    <Drawer.Navigator initialRouteName="Home"drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() =>Logout() } />
        </DrawerContentScrollView>
      )
    }}>
    <Drawer.Screen name="Home" component={Home} />
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