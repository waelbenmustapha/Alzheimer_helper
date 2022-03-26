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

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import   AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileElement from "../../Components/ProfileElement";

const CheckPendingNotes = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [userData, setuserData] =useState(null);


  function getData() {
    // axios
    //   .get(
    //     `http://192.168.1.39:8090/notes/get-notes-by-dementia-id/`
    //   )

      AsyncStorage.getItem('user')
      .then(value=>{
        console.log(JSON.parse(value));
        
        axios.get(`http://192.168.1.39:8090/pending-notes/get/${JSON.parse(value).dementia.id}`)
           .then((res) => {setNotes(res.data);console.log(res.data)})
     })
  }

  useEffect(() => {
    AsyncStorage.getItem('user', (err, item) => {setuserData(JSON.parse(item)) ;console.log("++++++"+item)})

    getData();
  }, [isFocused]);
  // if(userData==null){
  //   return (
  //   <View><Text>Loading</Text></View>
  //     )
  //   }
function  PageNavigate()
{ return note.action=="edit"?navigation.navigate("UpdatePendingNote", { note }):navigation.navigate("CheckPendingNote", { note })}
  return (

    <View style={[styles.container, { flex: 1, flexDirection: "column" }]}>
      
          {userData&&  <ProfileElement userData={userData}/>}


      <View style={[styles.container, { flex: 4, flexDirection: "column" }]}>
        <View style={[styles.container, { flexDirection: "row" }]}>

          <View style={styles.barre} />

          <View style={[styles.container, { flex: 10, flexDirection: "column" }]}>

            <View style={{ flex: 1 ,widht:'100%'}}>
              <View >

                <ScrollView style={styles.scrollView}>
                  {notes.map((note) => (<TouchableOpacity key={note.id}
                    onPress={() =>  note.action=="edit"&&note.status=="pending"?navigation.navigate("UpdatePendingNote", { note }):navigation.navigate("CheckPendingNote", { note })} style={[note.status=="accepted"?styles.item:note.status=="denied"?styles.item3:styles.item2]}>
                      
                      <Text>Title : {note.title}</Text>
                      <Text>Action : {note.action.toUpperCase()}</Text>
                      <Text style={styles.littleitem}> {note.status .toUpperCase()}</Text>
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
    alignItems:'center',
    backgroundColor: "#98FB9870",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  littleitem: {
    borderWidth: 1,
    width:'100%',
    borderRadius: 10,
    textAlign:'center',


  },
  item2: {
    alignItems:'center',

    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  item3: {
    alignItems:'center',

    backgroundColor: "#FAA0A070",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  container: {
    flex: 1,

  },
  container1:
  {
    position: "relative",
    justifyContent: "flex-end",
    flex: 2,
    flexDirection: "column",
    paddingBottom: 20,
    marginRight:"3%",


  },
  scrollView: {
    marginHorizontal: 5,
    marginRight:"3%",
    width:'100%',
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
    borderRadius: 10,
    elevation: 3,
    borderColor: "#093F38",
    backgroundColor: "#fff",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 5,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
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
