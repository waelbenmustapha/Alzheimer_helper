
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
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useIsFocused } from '@react-navigation/native'
import axios from "axios";
import * as Linking from 'expo-linking';


import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from "../Components/ProfileElement";


const Home = ({ navigation }) => {

  const [userData, setuserData] = useState(null);
  const [dir, setdir] = useState('');
  const [search, setSearch] = useState('');

  const isFocused = useIsFocused()


  const GoogleApi = () => {
    Linking.openURL(`https://www.google.com/search?q=${search}&tbm=vid`);
    console.log("google");
  }

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



  //localStorage

  const Logout = () => {
    try {
      AsyncStorage.removeItem("user")
      navigation.navigate("IntroSliderScreen")

    } catch (e) {
      console.log(e)
    }
    console.log('Done.')
  }

  useEffect(() => {

    console.log("******************************************************************")
    AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)) })
    console.log(isFocused)
    return () => { console.log("++++++++++" + isFocused); console.log("cleanup") }

  }, [isFocused]);

  if (userData == null) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    )
  }

  if (userData.dementia == null && userData.type == "guardian") {
    return (
      <View>
        <ImageBackground
          source={require("./../../../Front/assets/old.png")} style={styles.image1}
        >

          <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffffff80" }}>
            <TouchableOpacity onPress={() => Logout()} >
              <Text style={{ padding: "10%", fontSize: 32, textAlign: "center", color: "#359A8E", backgroundColor: "#ffffff" }}>You must have a dementia account related.</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }

  return (


    <View style={styles.container}>
      <ProfileElement userData={userData}/>

      <View style={{ flex: 6 }}>
        <View style={{ flexDirection: "row" }}>

          <View style={{ flex: 2 }} >
            <TouchableOpacity onPress={() => navigation.navigate("Contact")}
              style={{ alignItems: "center" }}>
              <Image
                source={require("./../../assets/Contact.png")}
                style={{
                  width: 150,
                  height: 250,
                  borderRadius: 40 / 2,
                  marginTop: 10,
                }} />
              <Text style={styles.Title2}>Contact</Text>
            </TouchableOpacity>
            {userData.type == "dementia" ? <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("HistoryDementia")}>
              <Image
                source={require("./../../assets/profile.png")}
                style={{
                  width: 150,
                  height: 180,
                  borderRadius: 40 / 2,
                }} />
              <Text style={styles.Title2}>History</Text>

            </TouchableOpacity> : userData.type == "guardian" ? <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("AddHistoryDementia")}>
              <Image
                source={require("./../../assets/profile.png")}
                style={{
                  width: 150,
                  height: 180,
                  borderRadius: 40 / 2,
                }} />
              <Text style={styles.Title2}>History</Text>

            </TouchableOpacity> : null}

          </View>


          <View style={{ flex: 2 }} >
            {userData.type == "dementia" ? <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("DemantiaLocation")}>
              <Image
                source={require("./../../assets/map.png")}
                style={{
                  width: 150,
                  height: 180,
                  borderRadius: 40 / 2,
                  marginTop: 10,
                }} />
              <Text style={styles.Title2}>Location</Text>
            </TouchableOpacity> : userData.type == "guardian" ? <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Location")}>
              <Image
                source={require("./../../assets/map.png")}
                style={{
                  width: 150,
                  height: 180,
                  borderRadius: 40 / 2,
                  marginTop: 10,
                }} />
              <Text style={styles.Title2}>Location</Text>
            </TouchableOpacity> : null}


            {/*  <Modal.Dialog>
              <Modal.Body>
                <TouchableOpacity style={styles.donebutton}
                  onPress={() => navigation.navigate('CheckDemantiaLocation')}>
                  <Text>Go check my demantia location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.donebutton}
                  onPress={() => navigation.navigate('DemantiaLocation')}>
                  <Text>Go my location</Text>
                </TouchableOpacity>
              </Modal.Body>
            </Modal.Dialog> */}


            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("CheckNotes")}>
              <Image
                source={require("./../../assets/Note.png")}
                style={{
                  width: 150,
                  height: 250,
                  borderRadius: 40 / 2,
                }} />
              <Text style={styles.Title2}>Notes</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>



      {/* <Button
      title="Go check my demantia location"
      onPress={() =>
        navigation.navigate('CheckDemantiaLocation')
      }
    />
     <Button
      title="Go my location"
      onPress={() =>
        navigation.navigate('DemantiaLocation')
      }
    />
 */}


    </View>

  );
};
const styles = StyleSheet.create({
  image1: {
    height: '100%',
    width: '100%',
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '5%',
  },
  firstItem: {
    alignItems: "flex-start",
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
   
  },
  searchIcon: {
    alignItems:"flex-end",
  },
  input: {
    margin:"2%",
    backgroundColor: "#fff",
    width:"70%",
    color: "#424242",
  },
  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#359A8E',
    backgroundColor: '#fff',
    shadowColor: '#359A8E',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
  searchSection: {
    padding: 5,
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

});

export default Home;
