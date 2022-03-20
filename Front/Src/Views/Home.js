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
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import * as Linking from 'expo-linking';

/* import Modal from 'react-bootstrap/Modal'
 */
const Home = ({ navigation }) => {

  const [search, setSearch] = useState('');

  

  const GoogleApi = () => {
    Linking.openURL(`https://www.google.com/search?q=${search}&tbm=vid`);
    console.log("google");
  }

  useEffect(() => {
    console.log(`http://192.168.8.100:8090/guardian/get`);
    axios.get(`http://192.168.8.100:8090/guardian/get`)
      .then((res) => console.log(res)).catch((err) => console.log(err))
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, flexDirection: "column" }}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Image
            source={require("./../../assets/profile.png")}
            style={styles.image}
          ></Image>
          <View style={styles.firstItem}>
            <Text style={styles.Title}>Welcome Alex Ten Napel </Text>
            <Text style={styles.Title}>Your age is 80 </Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.searchSection}>
            <TextInput placeholder="Search" onChangeText={(value) => setSearch(value)}></TextInput>
            <TouchableOpacity
              style={styles.input}
              onPress={() => GoogleApi()}>
              <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 6 }}>

        <ScrollView>
          <View style={{ flexDirection: "row" }}>

            <View style={{ flex: 1 }} >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={require("./../../assets/Contact.png")}
                  style={styles.image1} />
                <Text style={styles.Title2}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("AddHistoryDementia")}>
                <Image
                  source={require("./../../assets/profile.png")}
                  style={styles.image2} />
                <Text style={styles.Title2}>History</Text>
              </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }} >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate("Location")}>
                <Image
                  source={require("./../../assets/map.png")}
                  style={styles.image2} />
                <Text style={styles.Title2}>Location</Text>
              </TouchableOpacity>

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
                  style={styles.image1} />
                <Text style={styles.Title2}>Notes</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
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
    padding: '10%',
  },
  firstItem: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: "4%",
  },
  image: {
    width: "30%",
    height: "60%",
    borderRadius: 40 / 2,

  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  Title2: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 7,

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
  },
  image1: {
    width: "80%",
    height: 220,
    borderRadius: 40 / 2,
    marginTop: 5,
  },
  image2: {
    width: "80%",
    height: 170,
    borderRadius: 40 / 2,
    marginTop: 5,

  }

});

export default Home;