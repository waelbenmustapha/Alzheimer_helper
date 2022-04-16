import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from '../../Components/ProfileElement';
import { updateUser } from '../../Utils/user';


const AddHistoryDementia = ({ navigation }) => {
  const [history, setHistory] = useState(null);
  const [userData, setuserData] = useState(null);


  function AddHistory() {
    AsyncStorage.getItem('user')
      .then(value => {
        axios.post(`http://192.168.122.104:8090/story/add/${JSON.parse(value).dementia.id}`,
          history, {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
          .then((res) => {
          const user = userData;
          user.dementia.story = history;
          updateUser(user);
          navigation.navigate("HistoryDementia")})
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
        axios.get(`http://192.168.122.104:8090/story/get/${JSON.parse(value).dementia.id}`
        )
          .then((res) => {console.log(res.data);setHistory(res.data)})
      })

  }

  return (
    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>

      {userData && <ProfileElement userData={userData} />}
      <View style={styles.item}>
        <Text style={styles.sectionTitle}>Insert History</Text>
        
        <ScrollView style={styles.scrollView}>
          
            <TextInput multiline numberOfLines={1}
              value={history}
              style={styles.square}
              onChangeText={(text) => setHistory(text)} />
          
          <View style={styles.fixToText}>
            <TouchableOpacity style={styles.donebutton} onPress={() => { AddHistory() }}>
              <Text style={styles.color}>Save</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>




  )
}

export default AddHistoryDementia


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
 item: {
    flex:3
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
    fontSize:22,
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
    backgroundColor: "#fff",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },


  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
    paddingLeft: "20%",
    marginRight: "15%",
  },



});