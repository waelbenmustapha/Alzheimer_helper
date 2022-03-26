import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import {URL} from "@env"
import UpdateNote from "./UpdateNote";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendPushNotification } from "../../Utils/Notif";

const CheckNote = ({ route, navigation }) => {



    const messageDelete = {   
      'title': 'Note Removed',
     'body': 'Your dementia has delete a note'
   }  
   
      function deltenote() {
        AsyncStorage.getItem('user')
        .then(value=>{
          console.log(JSON.parse(value).type)
          if(JSON.parse(value).type =='dementia'){
          axios.post(`http://192.168.1.18:8090/pending-notes/delete-note/${route.params.el.id}`,
          )           
          .then((res) => {
            axios.get(`http://192.168.1.18:8090/dementia/guardian-push-token/${JSON.parse(value).id}`)
              .then((res) =>{
                sendPushNotification(res.data,messageDelete.title,messageDelete.body)
              })
            navigation.navigate("CheckNotes")})
  
  
        }
        else {
             axios.delete(`http://192.168.1.18:8090/notes/delete-note/${route.params.el.id}`,
             )
             .then((res) => navigation.navigate("CheckNotes"))
       }})
        }
  
  const [note, setNote] = useState(route.params.el);
  useEffect(() => {
    console.log(note);
  }, []);
  
  return (
    <View style={styles.container}>
        <View style={styles.items}>
          <View style={{padding:"3%"}}>
          <Text style={{fontSize:20}}>Title :</Text>

          <View style={styles.item}>
            <Text style={styles.square}>{note.title}</Text>
            </View>
                    </View>
          
      <View style={{padding:"3%"}}>
                  <Text style={{fontSize:22}}>Description :</Text>

            <View style={styles.item}>
              <Text style={styles.square}>{note.description}</Text>


            </View>
      </View>
          <Text style={styles.square}>{JSON.stringify((note.date)
                  ).substring(1, 11)} {JSON.stringify((note.date)
                    ).substring(12, 20)}</Text>

        </View>

      <ScrollView style={styles.scrollView}>
        

        <View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => {
              deltenote();
            }}
            style={styles.deletebutton}
          >
            <Text> Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateNote', {el: route.params.el});
            }}
            style={styles.donebutton}
          >
            <Text >Updated</Text>
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
    margin: "1%",
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
  },
  container: {
    flex: 1,
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
    margin:"2%",
    width: 300,
    fontSize:25,
  
    alignSelf: "center",
  
  },
  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: "#D86363",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
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
export default CheckNote;
