import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { useIsFocused } from "@react-navigation/native"
import axios from "axios";
import * as Speech from 'expo-speech';


import { Feather } from '@expo/vector-icons';


const HistoryDementia = ({navigation}) => {
    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);
    

    const runSpeech = () => {
      Speech.speak(history, {
        language: "fr"
        
      })
    }

    function getHistory() {
        axios
          .get(
            `http://192.168.1.26:8090/story/get/402888e47f88237e017f8853ff440000`
          )
          .then((res) => {
            console.log("************************");
            setHistory(res.data);
          });
      }

      useEffect(() => {
        getHistory();
      }, [isFocused]);


  return (
    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>
      <View style={{ flex: 1, padding: '15%' }}>

        <View style={{flex: 1, flexDirection: "row" }}>
        <Image
          source={require("./../../../assets/profile.png")}
          style={styles.image}
        ></Image>
        <View style={styles.firstItem}>
          <Text style={styles.Title}>Welcome Alex Ten Napel </Text>
          <Text style={styles.Title}>Your age is 80 </Text>
        </View>
      
      </View>
      <ScrollView style={styles.scrollView}> 
      <TouchableOpacity style={styles.microphone} onPress={()=>runSpeech()}><Feather name='mic'></Feather></TouchableOpacity>
        <Text style={styles.square}>{history}</Text>
        </ScrollView>
      </View>
      </View>
      

  )
}

export default HistoryDementia


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
  firstItem:{
    marginTop:3,
    marginBottom:4

  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
    
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
    marginTop:4,
 },
  microphone:{
    marginLeft:200,
    padding:15,

  }
 

      
      
   
    });