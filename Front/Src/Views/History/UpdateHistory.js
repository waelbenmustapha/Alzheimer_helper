import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendPushNotification } from "../../Utils/Notif";
import { LinearGradient } from "expo-linear-gradient";

const UpdateHistory = ({ route, navigation }) => {

  const [history, setHistory] = useState(route.params.history);



  function UpdateHistory() {

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'guardian') {

          axios.put(`http://192.168.1.19:8090/story/update/${JSON.parse(value).dementia.id}`,
            history, {
              headers: {
                'Content-Type': 'text/plain'
              }
          })
            .then((res) => navigation.navigate("drawer"))
        }
      })
  }

  function DeleteHistory() {
    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'guardian') {

          axios.delete(`http://192.168.1.19:8090/story/delete/${JSON.parse(value).dementia.id}`,
            { history: history })
            .then((res) => navigation.navigate("drawer"))
        }
      })

  }


  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#359A8E50", "#4A0D6650"]}
      style={styles.container}
      end={{ x: 0.8, y: 0.5 }}
    >
      <View style={styles.items}>
        <View style={styles.items}>
          <Text style={styles.sectionTitle}>Update or delete your dementia story</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <TextInput  multiline numberOfLines={4}
          value={history} onChangeText={(value) => setHistory(value)} style={styles.square}></TextInput>
        </View>

        <View style={styles.fixToText}>

          <TouchableOpacity style={styles.deletebutton} onPress={() => {DeleteHistory()}}>
            <Text style={styles.color}> Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.updatebutton} onPress={() => {UpdateHistory()}}>
            <Text style={styles.color}>Update</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: "5%",
  },
  item: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: "5%"
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  scrollView: {
    marginHorizontal: 5,
  },
  square: {
    fontSize: 22,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
    color: "black"
  },
  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: "#D86363",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
  },
  color: {
    color: "black",
    fontSize: 18
  },
  deletebutton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#D86363",
    backgroundColor: "#D86363",
    shadowColor: "#D86363",
    shadowOpacity: 0.2,
    shadowRadius: 1.22,
    elevation: 11,
  },
  updatebutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#359A8E",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
  fixToText: {
    margin: "10%",
    flexDirection: "row",
    justifyContent: "space-between",

  },
});
export default UpdateHistory;
