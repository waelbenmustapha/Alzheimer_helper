import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import heure from '../../../assets/heure.png'
import axios from 'axios';
import { URL } from "@env"

const AddNotes = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  function AddNote() {

    axios.post(`http://192.168.8.100:8090/notes/add-note/${id}`,
      { description: description, title: title, date: date })
      .then((res) => navigation.navigate("CheckNotes"))
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

  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');




  return (

    <View style={styles.container}>
      <TextInput multiline numberOfLines={1}
        onChangeText={(text) => setTitle(text)} style={styles.input}
        placeholder="Note title" />
      <TextInput multiline numberOfLines={4}
        onChangeText={(text) => setDescription(text)} style={styles.input}
        placeholder="Description" />
      <View style={styles.pad}>
        <View>
          <TouchableOpacity onPress={showDatepicker}>
            <Image style={styles.DateTimePicker} source={heure} />
          </TouchableOpacity>
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
      <TouchableOpacity onPress={() => { AddNote() }} >
        <Text style={styles.donebutton}>Save</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    flex: 1,


  },
  setFontSize: {
    fontSize: 20,
  },
  pad: {
    padding: 25,

  },
  input: {
    width: 300,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: "#093F38",
    backgroundColor: "#fff",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,
  },

  donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#093F38',
    backgroundColor: '#fff',
    shadowColor: '#093F38',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },

  DateTimePicker: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignItems: "center"

  }

});

export default AddNotes
