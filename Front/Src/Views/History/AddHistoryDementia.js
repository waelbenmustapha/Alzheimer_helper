import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from '../../Components/ProfileElement';
import { LinearGradient } from "expo-linear-gradient";


const AddHistoryDementia = ({ navigation }) => {
  const [history, setHistory] = useState(null);
  const [userData, setuserData] = useState(null);


  function AddHistory() {
    AsyncStorage.getItem('user')
      .then(value => {
        axios.post(`http://192.168.1.19:8090/story/add/${JSON.parse(value).dementia.id}`,
          history, {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
          .then((res) => navigation.navigate("drawer"))
      })

  }
  useEffect(() => {
    console.log("******************************************************************")
    AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)) })
    getStory()

  }, []);

  if (userData == null) {
    return (
      <View><Text>Loading</Text></View>
    )
  }


  function getStory() {
    AsyncStorage.getItem('user')
      .then(value => {
        axios.get(`http://192.168.1.19:8090/story/get/${JSON.parse(value).dementia.id}`
        )
          .then((res) => setHistory(res.data))
      })

  }

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#359A8E50", "#4A0D6650"]}
      style={styles.container}
      end={{ x: 0.8, y: 0.5 }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>

        {userData && <ProfileElement userData={userData} />}
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Insert History</Text>

          <ScrollView style={styles.scrollView}>

            <TextInput multiline numberOfLines={4}
              value={history}
              style={styles.square}
              onChangeText={(text) => setHistory(text)} />

            <View style={styles.fixToText}>
              <TouchableOpacity style={styles.donebutton} onPress={() => { AddHistory() }}>
                <Text style={styles.color}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updatebutton} onPress={() => navigation.navigate("UpdateHistory", { history: history })}>
                <Text style={styles.color}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>



  )
}

export default AddHistoryDementia


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
  item: {
    flex: 3
  },
  color: {
    color: "black",
    fontSize: 18
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionTitle: {
    margin: "5%",
    marginLeft: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  square: {
    fontSize: 22,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignSelf: "center",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 0,
    color: "black"


  },

  scrollView: {
    // marginHorizontal: 5,
  },

  updatebutton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#fff",
    shadowColor: "#359A8E",
    shadowOpacity: 0.2,
    shadowRadius: 1.22,
    elevation: 11,
  },
  donebutton: {
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
    margin: "15%",
    flexDirection: "row",
    justifyContent: "space-between",

  },



});