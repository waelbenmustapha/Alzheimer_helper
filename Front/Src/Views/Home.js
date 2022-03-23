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
  BackHandler, 
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { useIsFocused } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from "../Utils/user";
import ProfileElement from "../Components/ProfileElement";


const Home = ({ navigation }) => {

  const [userData, setuserData] = useState(null);
  const isFocused = useIsFocused()


  //localStorage


  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => {setuserData(JSON.parse(item))})
   
     
  },[isFocused]  );

  if (userData == null) {
    return (
      <View><Text>Loading</Text></View>
    )
  }

  return (


    <View style={styles.container}>
     <ProfileElement userData={userData}/>
      <View style={{ flex: 9 }}>
        <View style={{ flexDirection: "row" }}>

          <View style={{ flex: 2 }} >
            <TouchableOpacity style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Contact")}>
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
            {  userData.type=="guardian"&& userData.dementia.story==null?
                  <TouchableOpacity style={{ alignItems: "center" }}
                              onPress={() => navigation.navigate("AddHistoryDementia")}>
                              
                  <Image
                    source={require("./../../assets/profile.png")}
                    style={{
                      width: 150,
                      height: 180,
                      borderRadius: 40 / 2,
                    }} />
                  <Text style={styles.Title2}>History</Text>
            </TouchableOpacity>
              :
                  <TouchableOpacity style={{ alignItems: "center" }}
                              onPress={() => navigation.navigate("HistoryDementia")}>
                              
                  <Image
                    source={require("./../../assets/profile.png")}
                    style={{
                      width: 150,
                      height: 180,
                      borderRadius: 40 / 2,
                    }} />
                  <Text style={styles.Title2}>History</Text>
            </TouchableOpacity>}
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
            </TouchableOpacity>: null}
            


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
  },
  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#093F38',
    backgroundColor: '#fff',
    shadowColor: '#093F38',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  }


});

export default Home;
