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



export default function ProfileElement(props) {
  const [userData, setuserData] = useState(null);
  const isFocused = useIsFocused()
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <View style={{ flex: 3, alignItems: "center" }}>
      <View style={{ flex: 1, width: "90%", flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{  uri: props.userData.type == "dementia" ? props.userData.image : props.userData.dementia.image}}
          style={styles.image}
        ></Image>
        <View style={styles.firstItem}>
          <Text style={styles.Title}>Welcome {props.userData.name} </Text>
          {props.userData.type == "dementia" ? <Text style={styles.Title}>Your age is {getAge(props.userData.birthdate)} </Text>
            : props.userData.type == "guardian" ? <Text style={styles.Title}>You are the guardian for {props.userData.dementia.name}</Text> : null}
        </View>
      </View>

    </View>)
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '5%',
  },
  firstItem: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: {
    margin: "2%",
    width: "50%",
    height: "50%",
    borderRadius: 40 / 2,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 18,
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
  }
})
