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

const UpdateNote = ({ route, navigation }) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [description, setDescription] = useState(route.params.el.description);
    const [title, setTitle] = useState(route.params.el.title);
    const messageUpdate = {   
      'title': 'Note Update',
     'body': 'Your dementia has Update a note'
   } 


   function UpdateNote() {

    AsyncStorage.getItem('user')
      .then(value=>{console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if(JSON.parse(value).type =='dementia'){
        axios.put(`https://alzhelper.herokuapp.com/pending-notes/edit-note/${route.params.el.id}`,
        {description:description, title:title,date:date})
        .then((res) => {
          axios.get(`https://alzhelper.herokuapp.com/dementia/guardian-push-token/${JSON.parse(value).id}`)
            .then((res) =>{
              sendPushNotification(res.data,messageUpdate.title,messageUpdate.body)
            })
          navigation.navigate("CheckNotes")})

      }
      else {
           axios.put(`https://alzhelper.herokuapp.com/notes/edit-note/${route.params.el.id}`,
           {description: description, title: title, date: date })
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
        <View style={styles.items}>
          <Text style={styles.sectionTitle}>Check Note</Text>
          <View style={styles.item}>
            <TextInput value={title} onChangeText={(value) => setTitle(value)}></TextInput>
            <Text>{note.date}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <TextInput value={description} onChangeText={(value) => setDescription(value)} style={styles.square}></TextInput>
        </View>

        <View style={styles.fixToText}>

          <TouchableOpacity
            onPress={() => {
              UpdateNote();
            }}
            style={styles.donebutton}
          >
            <Text>Update</Text>
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
    shadowColor: "#359A8E",
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
export default UpdateNote;