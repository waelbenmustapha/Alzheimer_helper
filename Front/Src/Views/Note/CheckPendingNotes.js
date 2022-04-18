import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import NoteElement from "../../Components/NoteElement";
import { AntDesign } from "@expo/vector-icons";
import { URL } from "@env"
import SelectDropdown from 'react-native-select-dropdown'

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileElement from "../../Components/ProfileElement";

const CheckPendingNotes = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [notesCopy, setNotesCopy] = useState([]);

  const [userData, setuserData] = useState(null);
  const vals = ["all", "accepted", "denied", "pending"]



  function getData() {
    // axios
    //   .get(
    //     `https://alzhelper.herokuapp.com/notes/get-notes-by-dementia-id/`
    //   )

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));

        axios.get(`https://alzhelper.herokuapp.com/pending-notes/get/${JSON.parse(value).dementia.id}`)
          .then((res) => { setNotes(res.data); setNotesCopy(res.data); console.log(res.data) })
      })
  }

  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => { setuserData(JSON.parse(item)); console.log("++++++" + item) })

    getData();
  }, [isFocused]);
  // if(userData==null){
  //   return (
  //   <View><Text>Loading</Text></View>
  //     )
  //   }

  return (

    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>

      {userData && <ProfileElement userData={userData} />}
      <View style={{ alignItems: "center"}}>
        <SelectDropdown
        buttonStyle={styles.donebutton}
          data={vals}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            {
              selectedItem == "all" ? setNotes(notesCopy) :
                setNotes
                  (notesCopy.filter(function (event) {
                    return event.status == selectedItem
                  }))
            }
          }}

        />
      </View>
      <View style={[styles.container, { flex: 3, flexDirection: "column" }]}>
          <View style={[styles.container, { flexDirection: "row" }]}>

{/*           <View style={styles.barre} />
 */}
          <View style={[styles.container, { flex: 10, flexDirection: "column" }]}>

            <View style={{ flex: 1 }}>
              <View >

                <ScrollView style={styles.scrollView}>
                  {notes.map((note) => (<TouchableOpacity key={note.id}
                    onPress={() => note.action == "edit" && note.status == "pending" ? navigation.navigate("UpdatePendingNote", { note }) : navigation.navigate("CheckPendingNote", { note })} style={[note.status == "accepted" ? styles.item : note.status == "denied" ? styles.item3 : styles.item2]}>
                    <Text style={styles.title}>{note.action}</Text>
                    <Text style={styles.subtitle}>Title : </Text>
                    <Text> {note.title}</Text>
                    <Text style={styles.subtitle}>Date : </Text>
                    <Text>{note.date}</Text>
                    <Text style={styles.subtitle}>Description : </Text><Text>{note.description}</Text>
                    <Text style={styles.littleitem}> {note.status.toUpperCase()}</Text>
                  </TouchableOpacity>))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  items: {
    padding: 0,
  },
  item: {
    backgroundColor: "#98FB98",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  item2: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  container: {
    flex: 1,
    padding: "1%",

  },
  littleitem: {
    width: '100%',
    textAlign: 'center',


  },
  item3: {
    backgroundColor: "#FF000090",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,
  },
  container1:
  {
    position: "relative",
    justifyContent: "flex-end",
    flex: 2,
    flexDirection: "column",
    paddingBottom: 20
  },
  scrollView: {
    marginHorizontal: 5,
  },
  image: {
    marginTop: 5,
    marginLeft: 20,
    fontSize: 28,
    fontWeight: "bold",

  },
  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: "#D86363",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
  },
  donebutton: {
    alignItems: "center",
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#fff",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#359A8E"
  },
  subtitle: {
    fontSize: 18,
    padding: "2%"

  },
  firstItem: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: "4%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 40 / 2,
  },
  barre: {
    flex: 0,
    backgroundColor: "#4A0D66",
    padding: 1,
    marginLeft: 40,

  }
});

export default CheckPendingNotes;
