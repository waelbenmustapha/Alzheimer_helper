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
        axios.post(`http://https://alzhelper.herokuapp.com/story/add/${JSON.parse(value).dementia.id}`,
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
        axios.get(`http://https://alzhelper.herokuapp.com/story/get/${JSON.parse(value).dementia.id}`
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

         <ProfileElement userData={userData}/>

    
        <View style={styles.item}>

          <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <TextInput multiline numberOfLines={4} style={styles.square} onChangeText={(text) => setHistory(text)} placeholder="History"/>
         
       
            <View style={styles.fixToText}>
             <TouchableOpacity onPress={()=>{AddHistory()}}>
        <Text style={styles.donebutton}>Save</Text>
      </TouchableOpacity>
      </View>
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
    margin: "5%",

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
    margin:"5%",
    alignItems:"flex-end",

    flexDirection: "row",
    justifyContent: "flex-end",

  },



});