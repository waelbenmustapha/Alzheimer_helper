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

const UpdateHistory = ({ route, navigation }) => {

    const [history, setHistory] = useState(route.params.history);
   


   function UpdateHistory() {

    AsyncStorage.getItem('user')
      .then(value=>{console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if(JSON.parse(value).type =='guardian'){
       
           axios.put(`https://alzhelper.herokuapp.com/story/update/${JSON.parse(value).dementia.id}`,
           history,{headers:{ 
            'Content-Type': 'text/plain'
          }})
           .then((res) => navigation.navigate("drawer"))
     }})
  }

  function DeleteHistory(){
    AsyncStorage.getItem('user')
    .then(value=>{console.log(JSON.parse(value));
      console.log(JSON.parse(value).type)
      if(JSON.parse(value).type =='guardian'){
     
         axios.delete(`https://alzhelper.herokuapp.com/story/delete/${JSON.parse(value).dementia.id}`,
         {history:history })
         .then((res) => navigation.navigate("drawer"))
   }})

  }

  
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <View style={styles.items}>
          <Text style={styles.sectionTitle}>Update and delete History</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <TextInput value={history} onChangeText={(value) => setHistory(value)} style={styles.square}></TextInput>
        </View>

        <View style={styles.fixToText}>

          <TouchableOpacity style={styles.updatebutton} onPress={() => {UpdateHistory()}}>
            <Text style={styles.color}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deletebutton} onPress={() => {DeleteHistory()}}>
            <Text style={styles.color}> Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: "5%",
  },
  item: {
    flex:3
  },
  container: {
    flex: 1,
    padding:"5%"
  },
  sectionTitle: {
    margin: "5%",
    marginLeft: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  scrollView: {
    marginHorizontal: 5,
  },
  square: {
    fontSize:22,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
    color:"black"
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
    color:'#359A8E',
    backgroundColor: "#fff",
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
    color:'#359A8E',
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
export default UpdateHistory;
