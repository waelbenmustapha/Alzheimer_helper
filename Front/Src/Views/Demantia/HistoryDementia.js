import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { useIsFocused } from "@react-navigation/native"
import axios from "axios";
import * as Speech from 'expo-speech';


import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from '../../Components/ProfileElement';


const HistoryDementia = ({navigation}) => {
    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);
    const [userData, setuserData] =useState(null);

    
    

       const runSpeech = () => {
      Speech.speak(history, {
        language: "fr"
        
      })
    }

    function getHistory() {
     
          AsyncStorage.getItem('user')

          .then(value=>{console.log(JSON.parse(value));
            console.log(JSON.parse(value).type)
            if(JSON.parse(value).type =='dementia'){
              axios
              .get(
                `http://192.168.1.17:8090/story/get/${JSON.parse(value).id}`
              )
              .then((res) => {
                console.log("************************");
                setHistory(res.data);
              });
    
          }
          else {
            axios
            .get(
              `http://192.168.1.17:8090/story/get/${JSON.parse(value).dementia.id}`
            )
            .then((res) => {
              console.log("************************");
              setHistory(res.data);
            });
  
         }
        })
      }

      useEffect(() => {

        AsyncStorage.getItem('user', (err, item) => {setuserData(JSON.parse(item)) ;console.log("++++++"+item)})

        getHistory();
      }, [isFocused]);
      
      if((userData==null)){
        return (
        <View><Text>Loading</Text></View>
          )
        }
        if((history==null)){
          return (
          <View><Text>Loading</Text></View>
            )
          }
  return (
    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>
      <View style={{ flex: 1, padding: '15%' }}>

      <ProfileElement userData={userData}/>

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