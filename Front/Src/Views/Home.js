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
import React, { useEffect } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import { URL } from "@env"
/* import Modal from 'react-bootstrap/Modal'
 */
const Home = ({ navigation }) => {



  useEffect(() => {
    console.log(`http://192.168.1.61:8090/guardian/get`);
    axios.get(`http://192.168.1.61:8090/guardian/get`).then((res) => console.log(res)).catch((err) => console.log(err))
  }, [])

  return (


    <View style={styles.container}>
      <View style={{ flex: 3, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("./../../assets/profile.png")}
            style={styles.image}
          ></Image>
          <View style={styles.firstItem}>
            <Text style={styles.Title}>Welcome Alex Ten Napel </Text>
            <Text style={styles.Title}>Your age is 80 </Text>
          </View>
        </View>

        <View style={{ flex: 0, flexDirection: "column" }}>
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
            <TextInput
              style={styles.input}
              placeholder="User Nickname"
              onChangeText={(searchString) => {
                this.setState({ searchString });
              }}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 9 }}>
        <View style={{ flexDirection: "row" }}>

          <View style={{ flex: 2 }} >
            <TouchableOpacity style={{ alignItems: "center" }}>
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
            <TouchableOpacity style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("SignupDementia")}>
              <Image
                source={require("./../../assets/profile.png")}
                style={{
                  width: 150,
                  height: 180,
                  borderRadius: 40 / 2,
                }} />
              <Text style={styles.Title2}>History</Text>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 2 }} >
            <TouchableOpacity
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
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
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
