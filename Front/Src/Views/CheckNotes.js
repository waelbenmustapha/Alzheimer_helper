import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import React, { useState, useEffect } from "react";
import NoteElement from "../Components/NoteElement";
import { AntDesign } from '@expo/vector-icons';

import axios from "axios";


const CheckNotes = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  function getData() {

    axios.get("http://192.168.1.60:8090/guardian/get/4028b8817f092fe7017f093140e80000").then((res) => { console.log("************************"); setNotes(res.data.demantia.notes) });

  }


  useEffect(() => {
    getData();
  }, []);



  return (


    <View style={styles.container}>
      <View style={styles.items}>
        <TouchableOpacity onPress={() => { console.log("it's working out") }}>
          <AntDesign style={styles.backarrow} name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.items}>
          <Text>Check Note</Text>
          <View style={styles.item}>
            <Text>Note name</Text>
            <Text>  Time, Date</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('AddNote')}><Text>Add note</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('CheckNote')}><Text>Check note</Text></TouchableOpacity>
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
  )
}

const styles = StyleSheet.create({
  items: {
    padding: 5,
  },
  item: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 5,
    paddingStart: 250,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    marginTop: 5,
    marginLeft: 40,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#359A8E',
  },
  backarrow: {
    paddingLeft: 50,
    paddingTop: 50,
    shadowColor: '#D86363',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 6,

  }
})


export default CheckNotes;
