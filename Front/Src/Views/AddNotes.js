import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import heure from '../../assets/heure.png'
import axios from 'axios';
import { URL } from "@env"

const AddNotes = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  function AddNote() {

    axios.post(`http://192.168.1.14:8090/notes/add-note/402881907f190703017f1909a0080001`, { description: description, title: title, date: date }).then((res) => navigation.navigate("CheckNotes"))
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);
    if (mode == "date") {
      setMode("time");
      setShow(true);

    }

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>

          <View style={styles.item}>
            <TextInput onChangeText={(text) => setTitle(text)} style={styles.square} placeholder="Note title" />

            <View style={styles.item}>
              <TextInput onChangeText={(text) => setDescription(text)} style={styles.squareDecription} multiline={true}
     numberOfLines={10} placeholder="Description" />
            </View>
            <TouchableOpacity onPress={showDatepicker}><Image style={styles.DateTimePicker} source={heure} /></TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.fixToText}>
              <TouchableOpacity style={styles.donebutton} onPress={() => { AddNote() }}>
                <Text> Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View></ScrollView>
    </View>
    /*  <View style={styles.container}>
        <TextInput onChangeText={(text) => setTitle(text)} style={styles.input} placeholder="Note title" />
        <TextInput onChangeText={(text) => setDescription(text)} style={styles.inputDesc} placeholder="Description" />
        <View>
          <View>
            <TouchableOpacity onPress={showDatepicker}><Image style={styles.DateTimePicker} source={heure} /></TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <TouchableOpacity onPress={() => { AddNote() }} style={styles.btnVal}><Text style={styles.txtVal}>Save</Text></TouchableOpacity>
      </View> */

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  DateTimePicker: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',


  },

  items: {
    padding: 5,
  },
  item: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 20,
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
  squareDecription: {
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
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  donebutton: {
    alignItems: "center",
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

export default AddNotes
