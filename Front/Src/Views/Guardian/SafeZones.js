import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import NoteElement from "../../Components/NoteElement";
import { AntDesign } from "@expo/vector-icons";
import { URL } from "@env"

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileElement from "../../Components/ProfileElement";
import { color } from "react-native-reanimated";
import { getUserData } from "../../Utils/user";

const SafeZones = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [zone, setZone] = useState([]);
  const [userData, setuserData] = useState(null);


  async function getAllSafeZones(){
    const user =JSON.parse(await AsyncStorage.getItem("user"))
    axios
     .get(
       `http://192.168.1.16:8090/dementia/get-safezones/${user.dementia.id}`
     ).then(res=> {
      setZone(res.data)
      console.log(res.data)
   }
   )}
   async function enableZone(zone){
    const user = JSON.parse(await AsyncStorage.getItem("user"))
    console.log(user)
    axios
    .post(
      `http://192.168.1.16:8090/dementia/enable-safezone/${user.dementia.id}/${zone.id}`
    ).then(res=> 
      {
      alert("That zone are active")
      getAllSafeZones()})
   }

   useEffect( () => {
    getAllSafeZones()

  },  [isFocused]);


  return (

    <View style={styles.container}>



            <View style={{ flex: 1 }}>
              <View >
                <ScrollView style={styles.scrollView}>
                  {zone.map((el) =>
                  (<TouchableOpacity key={el.id}
                    onPress={() => enableZone(el)} style={el.active==true?styles.item:styles.item1}>
                    <View>
                      <Text style={styles.subtitle}>{el.title}</Text>
                        </View>
                  </TouchableOpacity>))}
                </ScrollView>
              </View>
            </View>
          </View>
       


        
  );
};




const styles = StyleSheet.create({
  items: {
    padding: 0,
  },
  item: {
    backgroundColor: "#00FF00",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  item1: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  container: {  
    flex: 1,

  },
  subtitle: {
    fontSize: 24  ,
    padding:"2%",
color:"#000"
  },
  container1:
  {
    position: "relative",
    justifyContent: "flex-end",
    flex: 2,
    flexDirection: "column",
    paddingBottom: 20
  },
  scrollView: {
    marginHorizontal: 5,
  },

  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: "#D86363",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
  },
  donebutton: {
    alignItems: "center",
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#fff",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 5,
  },
  Title: {
    fontSize: 20,
    color:"#000"

  },
  firstItem: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: "4%",
  },
  
  barre: {
    flex: 0,
    backgroundColor: "#4A0D66",
    padding: 1,
    marginLeft: 40,

  }
});

export default SafeZones;
