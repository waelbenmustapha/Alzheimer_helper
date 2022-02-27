import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import NoteElement from "../Components/NoteElement";
import { AntDesign } from "@expo/vector-icons";
import {URL} from "@env"

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const CheckNotes = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);

  function getData() {
    axios
      .get(
        `http://192.168.8.100:8090/notes/get-notes-by-dementia-id/402881907f190703017f1909a0080001`
      )
      .then((res) => {
        console.log("************************");
        setNotes(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <View style={styles.items}>
          <ScrollView style={styles.scrollView}>
            {notes.map((el) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CheckNote", { el })}
                style={styles.item}
              >
                <Text>Title : {el.title}</Text>
                <Text>Date : {el.date}</Text>
                <Text>Description : {el.description}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate("AddNote")}
              style={styles.donebutton}
            >
              <Text>Add note</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* <View>
        <Text>{number}</Text>
        {notes.map((el) => <NoteElement key={el.id} element={el} />)}
        <TouchableOpacity onPress={() => { console.log("it's working hhh : " + number); numberPlus() }} style={{ padding: 25, backgroundColor: "blue" }}>
          <Text>Add plus 1</Text>
        </TouchableOpacity>


      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: 5,
  },
  item: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginHorizontal: 5,
  },
  image: {
    marginTop: 5,
    marginLeft: 40,
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
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
    justifyContent: "center",
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#093F38",
    backgroundColor: "#fff",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 5,
  },
});

export default CheckNotes;
