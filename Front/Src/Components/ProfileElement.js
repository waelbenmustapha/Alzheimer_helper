import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfileElement = () => {
  const [userData, setuserData] =useState(null);
  const isFocused = useIsFocused()

  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => {setuserData(JSON.parse(item))})
  
  },[isFocused]  );
  return (
    <View style={{ flex: 3, alignItems:"center" }}>
    <View style={{ flex: 1,width:"90%", flexDirection:"row" ,alignItems:"center"}}>
      <Image
        source={require("./../../assets/profile.png")}
        style={styles.image}
      ></Image>
      <View style={styles.firstItem}>
        <Text style={styles.Title}>Welcome {userData.name} </Text>
        {userData.type=="dementia"?<Text style={styles.Title}> you are age is {getAge(userData.birthdate) } </Text> :userData.type=="guardian"?<Text style={styles.Title}> you are a guardian of {userData.dementia.name} </Text>: null}
      </View>
    </View>

  </View>  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '5%',
  },
  firstItem: {
    alignItems: "flex-end",
    justifyContent: "center",
    // marginLeft: 10,
  },
  image: {
    width: "40%",
    height: "90%",
    borderRadius: 40 / 2,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  Title2: {
    fontWeight: "bold",
    fontSize: 18,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    color: "#424242",
  }})
export default ProfileElement