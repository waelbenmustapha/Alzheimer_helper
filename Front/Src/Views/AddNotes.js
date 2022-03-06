import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native'
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

    axios.post(`http://192.168.1.14:8090/notes/add-note/402881907f190703017f1909a0080001`,
      { description: description, title: title, date: date }).then((res) => navigation.navigate("CheckNotes"))
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
    position: 'absolute',
    left: 37,
    top: 84,


  },
  setFontSize: {
    fontSize: 20,
  },
  setColorGreen: {
    color: '#359A8E',

  },
  input: {
    width: 300,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#F1F2F2'




  },
  inputDesc: {
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    padding: 100,
    marginTop: 10,
    backgroundColor: '#F1F2F2'
  },

  btnVal: {
    position: 'absolute',
    right: 0,
    top: 450,
    width: 100,
    padding: 10,
    borderRadius: 20

  },
  txtVal: {
    color: '#359A8E',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 5


  },
  DateTimePicker: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',


  }

});

export default AddNotes
