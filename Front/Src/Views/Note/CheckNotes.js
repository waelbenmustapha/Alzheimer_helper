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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileElement from "../../Components/ProfileElement";
import { color } from "react-native-reanimated";

const CheckNotes = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [userData, setuserData] = useState(null);


  function getData() {
    // axios
    //   .get(
    //     `https://alzhelper.herokuapp.com/notes/get-notes-by-dementia-id/`
    //   )

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        console.log(JSON.parse(value).type)
        if (JSON.parse(value).type == 'dementia') {
          axios.get(`https://alzhelper.herokuapp.com/notes/get-notes-by-dementia-id/${JSON.parse(value).id}`)
            .then((res) => {
              console.log(res.data)
              if (res.data != null)

                setNotes(res.data)
            }
            )


        }
        else {
          axios.get(`https://alzhelper.herokuapp.com/notes/get-notes-by-dementia-id/${JSON.parse(value).dementia.id}`)
            .then((res) => { setNotes(res.data); console.log(res.data) })
        }
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

    <View style={styles.container}>

      {userData && <ProfileElement userData={userData} />}


      <View style={[{ flex:4, flexDirection: "column" }]}>
        <View style={[styles.container, { flexDirection: "row" }]}>
          <View style={styles.barre} />
          <View style={[styles.container, { flex: 10, flexDirection: "column" }]}>
            <View style={{ flex: 1 }}>
              <View >
                <ScrollView style={styles.scrollView}>
                  {notes.map((el) =>
                  (<TouchableOpacity key={el.id}
                    onPress={() => navigation.navigate("CheckNote", { el })} style={styles.item}>
                    <View>
                      <Text style={styles.subtitle}>Title : </Text><Text style={styles.Title}>{el.title}</Text>
                      <Text style={styles.subtitle}>Date :</Text>
                      <Text style={styles.Title}>{JSON.stringify((el.date)
                      ).substring(1, 11)} at {JSON.stringify((el.date)
                      ).substring(12, 20)}</Text>
                      <Text style={styles.subtitle}>Description : </Text><Text style={styles.Title}>{el.description}</Text>
                    </View>
                  </TouchableOpacity>))}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.container1}>
            <TouchableOpacity onPress={() => navigation.navigate("AddNotes")}>
              <AntDesign name="pluscircleo" size={50} color="#4A0D66" />
            </TouchableOpacity>
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
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    paddingStart: 20,
    borderRadius: 10,

  },
  container: {
    flex: 1,
    padding:20

  },
  subtitle: {
    fontSize: 24  ,
    padding:"2%",
color:"#4A0D66"
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
    borderColor: "#359A8E",
    backgroundColor: "#fff",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 5,
  },
  Title: {
    fontSize: 20,
    color:"#000"

  },
  firstItem: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: "4%",
  },
  
  barre: {
    flex: 0,
    backgroundColor: "#4A0D66",
    padding: 1,

  }
});

export default CheckNotes;
