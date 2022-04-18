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
import { URL } from "@env"
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
      .then(value => {
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'dementia') {
          axios.put(`https://alzhelper.herokuapp.com/pending-notes/delete-note/${JSON.parse(value).id}/${route.params.el.id}`,
          )
            .then((res) => {
              axios.get(`https://alzhelper.herokuapp.com/dementia/guardian-push-token/${JSON.parse(value).id}`)
                .then((res) => {
                  sendPushNotification(res.data, messageDelete.title, messageDelete.body)
                })
              navigation.navigate("CheckNotes")
            })


        }
        else {
          axios.delete(`https://alzhelper.herokuapp.com/notes/delete-note/${route.params.el.id}`,
          )
            .then((res) => navigation.navigate("CheckNotes"))
        }
      })
  }

  const [note, setNote] = useState(route.params.el);
  useEffect(() => {
    console.log(note);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.square, styles.items]}>
        <Text style={styles.subtitle}>Title : </Text>
        <Text style={styles.title}> {note.title}</Text>
        <Text style={styles.subtitle}>Date : </Text>
        <Text style={styles.title}>{JSON.stringify((note.date)
        ).substring(1, 11)} {JSON.stringify((note.date)
        ).substring(12, 20)}</Text>
        <Text style={styles.subtitle}>Description : </Text><Text style={styles.title}>{note.description}</Text>
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
              navigation.navigate('UpdateNote', { el: route.params.el });
            }}
            style={styles.donebutton}
          >
            <Text >Update</Text>
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
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
  },
  container: {
    flex: 1,
    paddingTop:"20%"
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
  fontSize:18,
  },
  subtitle: {
    fontSize: 26,
    padding:"2%",
    color:"#359A8E"
  },
  title:{
    fontSize:20
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
  paddingLeft: "35%",
  marginRight: "15%",
  },
});
export default CheckNote;