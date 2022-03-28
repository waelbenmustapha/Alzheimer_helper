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
      const [history, setHistory] = useState(null);
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
                  `http://192.168.96.99:8090/story/get/${JSON.parse(value).id}`
                )
                .then((res) => {
                  setHistory(JSON.stringify(res.data.history));
                });
      
            }
            else {
              axios
              .get(
                `http://192.168.96.99:8090/story/get/${JSON.parse(value).dementia.id}`
              )
              .then((res) => {
                console.log("************************");
                setHistory(JSON.stringify(res.data.history));
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
      
    return (
      <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>
        <View style={{ flex: 1, padding: '5%' }}>

        <ProfileElement userData={userData}/> 

        <ScrollView style={styles.scrollView}> 
        <TouchableOpacity style={styles.microphone} onPress={()=>runSpeech()}><Feather name='mic'></Feather></TouchableOpacity>
          <Text style={styles.square}>{history}</Text>
          {userData.type=="guardian"?<View style={styles.fixToText}>
          <TouchableOpacity
      
            style={styles.deletebutton}
          >
            <Text> Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
         
            style={styles.donebutton}
          >
            <Text >Updated</Text>
          </TouchableOpacity>
        </View>: null}
          </ScrollView>

        </View>
        </View>
        

    )
  }



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

    },
    deletebutton: {
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      borderColor: "#D86363",
      backgroundColor: "#fff",
      shadowColor: "#D86363",
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
      borderColor: "#093F38",
      backgroundColor: "#fff",
      shadowColor: "#093F38",
      shadowOpacity: 0.55,
      shadowRadius: 2.22,
      elevation: 11,
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin:"5%",
      paddingLeft: "25%",
      marginRight: "25%",
    },
  

        
        
    
      });

      export default HistoryDementia;