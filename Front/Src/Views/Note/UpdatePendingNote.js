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
import { LinearGradient } from "expo-linear-gradient";

const UpdatePendingNote = ({ route, navigation }) => {
  const [note, setNote] = useState(route.params.note);
  const [Oldnote, setOldNote] = useState(null);


  function AcceptPending() {
    axios.post(`https://alzhelper.herokuapp.com/pending-notes/accept/${route.params.note.id}`)
      .then((res) => {

        navigation.replace("CheckNotes"
        )
      })

  }
  function DeclinePending() {
    axios.post(`https://alzhelper.herokuapp.com/pending-notes/deny/${route.params.note.id}`)
      .then((res) => {

        navigation.replace("CheckNotes"
        )
      })

  }



  useEffect(() => {
    console.log(route.params.note.noteToEditId)

    axios.get(`https://alzhelper.herokuapp.com/notes/get-note/${route.params.note.noteToEditId}`)
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
    )
  }
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#359A8E50", "#4A0D6650"]}
      style={styles.container}
      end={{ x: 0.8, y: 0.5 }}
    >
      <Text style={styles.sectionTitle}>New NOTE</Text>
      <View style={[styles.square, styles.items]}>
        <Text style={styles.subtitle}>Title : </Text>
        <Text style={styles.title}> {note.title}</Text>
        <Text style={styles.subtitle}>Date : </Text>
        <Text style={styles.title}>{JSON.stringify((note.date)
        ).substring(1, 11)} {JSON.stringify((note.date)
        ).substring(12, 20)}</Text>
        <Text style={styles.subtitle}>Description : </Text><Text style={styles.title}>{note.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>OLD NOTE</Text>
      <View style={[styles.square, styles.items]}>
        <Text style={styles.subtitle}>Title : </Text>
        <Text style={styles.title}> {Oldnote.title}</Text>
        <Text style={styles.subtitle}>Date : </Text>
        <Text style={styles.title}>{JSON.stringify((Oldnote.date)
        ).substring(1, 11)} {JSON.stringify((Oldnote.date)
        ).substring(12, 20)}</Text>
        <Text style={styles.subtitle}>Description : </Text><Text style={styles.title}>{Oldnote.description}</Text>
      </View>


      {note.status == "pending" ? <View style={styles.fixToText}>
        <TouchableOpacity
          onPress={() => {
            DeclinePending();
          }}
          style={styles.deletebutton}
        >
          <Text style={{ color: "white" }}> Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AcceptPending();
          }}
          style={styles.donebutton}
        >
          <Text style={{ color: "white" }}> Accept</Text>
        </TouchableOpacity>

      </View> : null}
    </LinearGradient>
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
    padding: "5%"
  },
  sectionTitle: {
    margin: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  title: {
    fontSize: 18,
    color: "#000"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: "2%"

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
    alignItems: 'center',
    justifyContent: 'center',
    margin: "5%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#D86363",
    backgroundColor: "#D86363",
    shadowColor: "#D86363",
    shadowOpacity: 0.2,
    shadowRadius: 1.22,
    elevation: 11,
  },
  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: "5%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#359A8E",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
  fixToText: {
    marginLeft: "20%",
    marginRight: "20%",
    flexDirection: "row",
    justifyContent: "space-between",

  },
});
export default UpdatePendingNote;
