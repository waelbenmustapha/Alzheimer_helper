import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { URL } from "@env"
import UpdateNote from "./UpdateNote";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendPushNotification } from "../../Utils/Notif";

const CheckPendingNote = ({ route, navigation }) => {
  const [note, setNote] = useState(route.params.note);

  function AcceptPending() {
    axios.post(`http://192.168.1.16:8090/pending-notes/accept/${route.params.note.id}`)
      .then((res) => {

        navigation.navigate("CheckNotes")
      })

  }
  function DeclinePending()
  { 
    axios.post(`http://192.168.1.16:8090/pending-notes/deny/${route.params.note.id}`)           
  .then((res) => {
    
    navigation.navigate("CheckNotes")

  })
}
  function DeletePending() {
    axios.delete(`http://192.168.1.16:8090/pending-notes/delete-pending-note/${route.params.note.id}`)
      .then((res) => {

        navigation.navigate("CheckPendingNotes")
      })

  }

  useEffect(() => {
    console.log(note);
  }, []);

  return (
    <View style={styles.container}>
          <Text style={styles.sectionTitle}>Check what he is going to {note.action}</Text>



        <ScrollView style={styles.scrollView}>
          <View style={[styles.item]}>
            <Text style={[styles.subtitle,{ padding:"5%"}]}>Title : </Text>
            <Text style={ styles.square}>{note.title}</Text>
            <Text style={[styles.subtitle,{ padding:"5%"}]}>Date :</Text>
            <Text style={ styles.square}>{note.date}</Text>
            <Text style={[styles.subtitle,{ padding:"5%"}]}>Description :</Text>
            <Text style={ styles.square}>{note.description}</Text>
          </View>
          <View style={styles.fixToText}>
          {note.status=="pending"?<View style={styles.fixToText}>
          <TouchableOpacity
            onPress={() => {
              AcceptPending();
            }}
            style={styles.deletebutton}
          >
            <Text> Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              DeclinePending();
            }}
            style={styles.deletebutton}
          >
            <Text> Decline</Text>
          </TouchableOpacity>
        </View>:
        <TouchableOpacity
            onPress={() => {
              DeletePending();
            }}
            style={styles.deletebtn}
          >
            <Text> Delete</Text>
          </TouchableOpacity>}
          </View>
        </ScrollView>
      </View>
      );
};

      const styles = StyleSheet.create({
      /*   items: {
        padding: "6%",
  }, */
      item: {
        marginLeft: "5%",
      borderRadius: 10,
      justifyContent: "space-between",
  },
      container: {
        flex: 1,
  },
      sectionTitle: {
        marginTop: "20%",
      marginLeft: "10%",
      fontSize: 28,
      fontWeight: "bold",
      color: "#359A8E",
  },
      scrollView: {
        marginHorizontal: 5,
  },
      subtitle: {
        fontSize:18,
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
      backarrow: {
        paddingLeft: 50,
      paddingTop: 50,
      shadowColor: "#D86363",
      shadowOpacity: 0.55,
      shadowRadius: 2.22,
      elevation: 6,
  },
      deletebutton: {
        alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      borderColor: "#D86363",
      backgroundColor: "#fff",
      shadowColor: "#D86363",
      shadowOpacity: 0.2,
      shadowRadius: 1.22,
      elevation: 11,
  },
      donebutton: {
        alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      borderColor: "#093F38",
      backgroundColor: "#fff",
      shadowColor: "#093F38",
      shadowOpacity: 0.55,
      shadowRadius: 2.22,
      elevation: 11,
  },
      fixToText: {
        flexDirection: "row",
      justifyContent: "space-between",
      margin: "5%",
      paddingLeft: "20%",
      marginRight: "15%",
  },
});
      export default CheckPendingNote;
