import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";


const AddHistoryDementia = ({route,navigation}) => {
    const [hitory, setHistory] = useState("");

    function AddHistory() {

        axios.post(`http://192.168.8.100:8090/`,
          { history: history})
          .then((res) => navigation.navigate("HistoryDementia"))
      }
  return (
    <View style={styles.container}>
    <View style={{ flex: 3, flexDirection: "column" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("./../../../assets/profile.png")}
          style={styles.image}
        ></Image>
        <View style={styles.firstItem}>
          <Text style={styles.Title}>Welcome Alex Ten Napel </Text>
          <Text style={styles.Title}>Your age is 80 </Text>
        </View>
      </View>
=      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <Text style={styles.square} onChangeText={(text) => setHistory(text)}/>
        </View>
        </ScrollView>
        <TouchableOpacity onPress={() => { AddHistory() }} >
        <Text style={styles.donebutton}>Save</Text>
      </TouchableOpacity>
      </View>
      </View>
      

  )
}

export default AddHistoryDementia


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '5%',
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
  item: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 0,
  },
  square: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignSelf: "center",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 0,
    
  },
  
  scrollView: {
    marginHorizontal: 5,
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

      
      
   
    });