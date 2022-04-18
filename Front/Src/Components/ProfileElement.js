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
import warn from '../../images/warn.png'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Linking } from 'react-native';

export default function ProfileElement(props) {

const [guardiannumber,setGuardiannumber]=useState('');



  const [userData, setuserData] = useState(null);
  const isFocused = useIsFocused();

function getgnumb(id){
  console.log("hello")
  axios.get(`https://alzhelper.herokuapp.com/dementia/guardian-phone-number/${id}`).then((res)=>setGuardiannumber(res.data))
}

  useEffect(() => {
    if(props.userData.type == "dementia"){getgnumb(props.userData.id)}
  }, [])
  
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
    <View style={{ display: "flex", flexDirection: "row",justifyContent:'space-between',borderWidth:2,borderColor:'gray',padding:5,borderRadius:10,backgroundColor:'white'}}>
      <View>
        <Image
          source={{
            uri:
              props.userData.type == "dementia"
                ? props.userData.image
                : props.userData.dementia.image,
          }}
          style={styles.image}
        ></Image>
      </View>
      <View style={{ display: "flex", flexDirection: "column",flexShrink:1,justifyContent:'space-around',alignItems:'center',flexWrap:'wrap' }}>
        <View >
          <Text style={styles.Title}>Welcome {props.userData.name} </Text>
          {props.userData.type == "dementia" ? (
            <Text style={styles.Title}>
              Your age is {getAge(props.userData.birthdate)}
            </Text>
          ) : props.userData.type == "guardian" ? (
            <Text style={styles.Title}>
              You are the guardian of {props.userData.dementia.name}
            </Text>
          ) : null}
        </View>
        {props.userData.type == "dementia"&&<View><TouchableOpacity onPress={() => Linking.openURL(`tel:${guardiannumber}`)} ><Image source={warn} style={{height:75,width:75}}/></TouchableOpacity>
        </View>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: "5%",
  },
  firstItem: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderWidth:2,
    borderColor:'gray',  
    borderRadius: 75,
  },
  Title: {
    fontWeight: "bold",
    flexShrink: 1 ,
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
  },
});
