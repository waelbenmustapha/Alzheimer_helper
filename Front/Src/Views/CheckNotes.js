import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState,useEffect } from "react";
import NoteElement from "../Components/NoteElement";
import axios from "axios";
const CheckNotes = () => {
    const [notes,setNotes]=useState([]);

function getData(){

axios.get("http://192.168.1.60:8090/guardian/get/4028b8817f092fe7017f093140e80000").then((res)=>{console.log("************************");setNotes(res.data.demantia.notes)});

}

    const [number,setNumber]=useState(10);

    useEffect(() => {
        getData();
    }, []);
    
  function numberPlus() {
    setNumber(number+1);
  }
  

  return (
    <View>
      <Text>{number}</Text>
{notes.map((el)=><NoteElement key={el.id} element={el}/>)}
      <TouchableOpacity onPress={()=>{console.log("it's working : "+number);numberPlus()}} style={{ padding: 25, backgroundColor: "blue" }}>
        <Text>Add plus 1</Text>
      </TouchableOpacity>

     
    </View>
  );
};

export default CheckNotes;
