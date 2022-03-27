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

const UpdatePendingNote = ({ route, navigation }) => {
  const [note, setNote] = useState(route.params.el);
  const [Oldnote, setOldNote] = useState(null);


  function AcceptPending()
  { 
    axios.post(`http://192.168.1.18:8090/pending-notes/accept/${route.params.el.id}`)           
  .then((res) => {
    
    navigation.navigate("CheckPendingNotes")})

  }
  function DeclinePending()
  { 
    axios.post(`http://192.168.1.18:8090/pending-notes/deny/${route.params.el.id}`)           
  .then((res) => {
    
    navigation.navigate("CheckPendingNotes")})

  }
   
  
  
  useEffect(() => {
    console.log(route.params.el.noteToEditId)
    axios.get(`http://192.168.1.18:8090/notes/get-note/${route.params.el.noteToEditId}`)           
    .then((res) => {
      
      setOldNote(res.data)
   }
      )
      
  }, []);
  if (Oldnote == null) {
    return (
      <View>
        <Text>loading</Text>
        </View>
    )}
  return (
    <View style={styles.container}>
      <Text>New NOTE</Text>
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
        <Text>OLD NOTE</Text>

        <View style={styles.items}>
          <View style={{padding:"3%"}}>
          <Text style={{fontSize:20}}>Title :</Text>

          <View style={styles.item}>
            <Text style={styles.square}>{Oldnote.title}</Text>
            </View>
                    </View>
          
      <View style={{padding:"3%"}}>
                  <Text style={{fontSize:22}}>Description :</Text>

            <View style={styles.item}>
              <Text style={styles.square}>{Oldnote.description}</Text>


            </View>
      </View>
          <Text style={styles.square}>{JSON.stringify((Oldnote.date)
                  ).substring(1, 11)} {JSON.stringify((Oldnote.date)
                    ).substring(12, 20)}</Text>

        </View>

        {note.status=="pending"?<View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => {
              AcceptPending();
            }}
            style={styles.deletebutton}
          >
            <Text> Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              DeclinePending();
            }}
            style={styles.deletebutton}
          >
            <Text> Decline</Text>
          </TouchableOpacity>
        </View>:null}
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
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
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
export default UpdatePendingNote;