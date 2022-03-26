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



export default function DementiaProfileElement (props) {
  const [userData, setuserData] =useState(null);
  const isFocused = useIsFocused()
  function getAge(dateString) 
  {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
    }

  return (
    <View style={{ flex: 3, alignItems:"center" }}>
    <View style={{ flex: 1,width:"90%", flexDirection:"row" ,alignItems:"center"}}>
      <View style={styles.firstItem}>
        <Text style={styles.Title}>Name :{props.userData.dementia.name} </Text>
      <Text style={styles.Title}> Birthdate :  {JSON.stringify((props.userData.dementia.birthdate)
                  ).substring(1, 11)} </Text> 
      <Text style={styles.Title}> Email :  {props.userData.dementia.email } </Text> 

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

    justifyContent: "center",
    // marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
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
