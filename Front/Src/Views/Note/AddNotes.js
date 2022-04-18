import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import heure from '../../../assets/heure.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendPushNotification } from '../../Utils/Notif';

const AddNotes = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const message = {
    'title': 'Note Addition',
    'body': 'Your dementia has added a note'
  }

  function AddNote() {

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'dementia') {
          axios.post(`https://alzhelper.herokuapp.com/pending-notes/add-note/${JSON.parse(value).id}`,
            { description: description, title: title, date: date })
            .then((res) => {
              axios.get(`https://alzhelper.herokuapp.com/dementia/guardian-push-token/${JSON.parse(value).id}`)
                .then((res) => {
                  sendPushNotification(res.data, message.title, message.body)
                })
              navigation.navigate("CheckNotes")
            })

        }
        else {
          axios.post(`https://alzhelper.herokuapp.com/notes/add-note/${JSON.parse(value).dementia.id}`,
            { description: description, title: title, date: date })
            .then((res) => navigation.navigate("CheckNotes"))
        }
      })

  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);
    if (mode == "date") {
      setMode("time");
      setShow(true);
    }
    else {
      axios.post(`https://alzhelper.herokuapp.com/notes/add-note/${JSON.parse(value).dementia.id}`,
        { description: description, title: title, date: date })
        .then((res) => navigation.navigate("CheckNotes"))
    }

  }



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



      <View style={{ alignSelf: "center" }}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={styles.subtitle}>Note title</Text>
          <TextInput multiline numberOfLines={1}
            onChangeText={(text) => setTitle(text)} style={styles.square}
            placeholder="Note title" />
          <Text style={styles.subtitle}>Description</Text>
          <TextInput multiline numberOfLines={4}
            onChangeText={(text) => setDescription(text)} style={styles.square}
            placeholder="Description" />
        </View>
      </View>
      <View style={{ padding: "3%", alignItems: "center" }}>
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
      <View style={{ flex: 1, alignItems: "flex-end", }}>
        <TouchableOpacity onPress={() => { AddNote() }} >
          <Text style={styles.donebutton}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    /*  <View style={styles.container}>
        <TextInput onChangeText={(text) => setTitle(text)} style={styles.input} placeholder="Note title" />
        <TextInput onChangeText={(text) => setDescription(text)} style={styles.inputDesc} placeholder="Description" />
        <View>
          <View>
            <TouchableOpacity onPress={showDatepicker}><Image style={styles.DateTimePicker} source={heure} /></TouchableOpacity>
          </View>*/

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
  },

  subtitle: {
    fontSize: 24,
    padding: "1%",
    color: "#359A8E",

  },
  items: {
    padding: "1%",
  },
  sectionTitle: {
    marginTop: "10%",
    marginLeft: "1%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  square: {
    width: 300,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 20,
    padding: "5%",
    margin: "3%",
    alignSelf: "center",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
    fontSize: 18,
  },



  donebutton: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: " 5%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#359A8E',
    backgroundColor: '#fff',
    shadowColor: '#359A8E',
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

export default AddNotes;
