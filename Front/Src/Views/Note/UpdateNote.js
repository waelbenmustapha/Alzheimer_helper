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

const UpdateNote = ({ route, navigation }) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState(route.params.el.description);
    const [title, setTitle] = useState(route.params.el.title);
  
 
    function deltenote() {
      AsyncStorage.getItem('user')
      .then(value=>{console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if(JSON.parse(value).type =='dementia'){
        axios.delete(`http://192.168.8.100:8090/pending-notes/delete-note/${route.params.el.id}`,
        )

      }
      else {
           axios.delete(`http://192.168.8.100:8090/notes/delete-note/${route.params.el.id}`,
           )
           .then((res) => navigation.navigate("CheckNotes"))
     }})
      }


   function UpdateNote() {

    AsyncStorage.getItem('user')
      .then(value=>{console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if(JSON.parse(value).type =='dementia'){
        axios.put(`http://192.168.8.100:8090/pending-notes/edit-note/${route.params.el.id}`,
        {description:description, title:title,date:date})

      }
      else {
           axios.put(`http://192.168.8.100:8090/notes/edit-note/${route.params.el.id}`,
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
              deltenote();
            }}
            style={styles.deletebutton}
          >
            <Text> Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              UpdateNote();
            }}
            style={styles.donebutton}
          >
            <Text>Updated</Text>
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
export default UpdateNote;
