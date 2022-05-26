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
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo } from "@expo/vector-icons";
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
      .then(value => {
        console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'dementia') {
          axios.put(`https://alzhelper.herokuapp.com/pending-notes/edit-note/${route.params.el.id}`,
            { description: description, title: title, date: date })
            .then((res) => {
              axios.get(`https://alzhelper.herokuapp.com/dementia/guardian-push-token/${JSON.parse(value).id}`)
                .then((res) => {
                  sendPushNotification(res.data, messageUpdate.title, messageUpdate.body)
                })
              navigation.navigate("CheckNotes")
            })

        }
        else {
          axios.put(`https://alzhelper.herokuapp.com/notes/edit-note/${route.params.el.id}`,
            { description: description, title: title, date: date })
            .then((res) => navigation.navigate("CheckNotes"))
        }
      })
  }
  const [note, setNote] = useState(route.params.el);
  useEffect(() => {
    console.log(note);
  }, []);

  return (
    <LinearGradient
    // Button Linear Gradient
    colors={["#359A8E50", "#4A0D6650"]}
    style={styles.container}
    end={{ x: 0.8, y: 0.5 }}
  >
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.items}>
        <Entypo style={styles.DateTimePicker} name="clock" size={50} color="#4A0D66" />
        <Text style={styles.title}>{JSON.stringify((note.date)
        ).substring(1, 11)}</Text>
        <Text style={styles.title}> {JSON.stringify((note.date)
        ).substring(12, 20)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.subtitle}>Title : </Text>
        <TextInput style={styles.titleSouligner} onChangeText={(text) => setTitle(text)}> {note.title}</TextInput>
        <Text style={styles.subtitle}>Description : </Text>
        <TextInput style={styles.titleSouligner} onChangeText={(text) => setDescription(text)}>{note.description}</TextInput>
      </View>


        <View style={styles.fixToText}>
         
          <TouchableOpacity
          
            onPress={() => {
              UpdateNote();
            }}
            style={styles.donebutton}
          >
            <Text style={{ color: "#fff" }}>Update</Text>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  items: {
    alignItems: "center"
  },
  item: {
    margin: "10%",
  },
  container: {
    flex: 1,
    paddingTop:"2%"
  },
  Title: {
    margin: "10%",

    justifyContent: "flex-start",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  sectionTitle: {
    margin: "5%",
    marginLeft: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  subtitle: {
    fontSize: 20,
    color: "#00000090",
    marginLeft: "1%",

  },
  titleSouligner: {
    margin: "2%",
    marginLeft: "5%",
    fontSize: 24,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#00000010",

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
    fontSize: 18,
  },
  DateTimePicker: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 40,
    borderRadius: 80,
    margin: "5%"
  },
  subtitle: {
    fontSize: 26,
    padding: "2%",
    color: "#359A8E"
  },
  title: {
    fontSize: 20
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
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "space-between",
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
    margin: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",

  },
});
export default UpdateNote;