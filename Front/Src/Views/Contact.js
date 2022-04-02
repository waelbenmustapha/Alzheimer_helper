import { View, Modal, Text, Image, TouchableOpacity, ScrollView, Button, StyleSheet, SafeAreaView, StatusBar, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const Contact = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [phonenumber, setPhoneNumber] = useState(false);
  const [name, setName] = useState(false);


  function AddContact() {

    axios.post(/* `http://192.168.1.16:8090/notes/add-note/4028819a7fa94d3c017fa95b6dd90001` ,*/
      { phonenumber: phonenumber, name: name /*, image */ })
      .then((res) => setModalVisible(!modalVisible))
  }


  return (

    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Add Contact</Text>




      <View style={[styles.container, { flexDirection: "column" }]}>

        <ScrollView style={styles.scrollView}>
          <View style={styles.contactview} >
            <View style={{ alignItems: 'center' }} >
              <TouchableOpacity >
                <Image

                />
              </TouchableOpacity>
              <View style={styles.item}>
                <Text style={{ fontSize: 32 }}>Name</Text>
                <Text style={{ fontSize: 18 }}>Phone Number</Text>
              </View>
            </View>




          </View>
        </ScrollView>


        <View style={styles.addbutton}>
          <TouchableOpacity onPress={() => navigation.navigate("AddContact")}>

          </TouchableOpacity>
          <Pressable
            style={styles.addbutton}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="pluscircleo" size={50} color="#4A0D66" />
          </Pressable>



          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >


            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign name="closecircleo" size={40} color="black" />
                </Pressable>


                <View>
                  <View style={styles.form} >

                    <TextInput
                      style={styles.input}
                      value={name}
                      placeholder='Name'
                      autoCapitalize="none"
                      placeholderTextColor='#00000080'
                      onChangeText={(name) => setName(name)}
                    />


                    <TextInput
                      style={styles.input}
                      placeholder='Phone Number'
                      autoCapitalize="none"
                      value={phonenumber}
                      placeholderTextColor='#00000080'
                      onChangeText={(phonenumber) => setPhoneNumber(phonenumber)}
                    />
                  </View>
                </View>



                <Pressable onPress={() => AddContact()}>
                  <Text style={styles.addbutton}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </View>



      </View>



    </View>


  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '4%',
  },
  contactview: {
    flex: 1,
    padding: "5%",
  },
  scrollView: {
    marginHorizontal: 5,
  },
  item: {
    alignItems: "center",
    padding: "7%",
    paddingStart: 20,
    borderRadius: 10,
  },

  Title: {
    fontWeight: "bold",
    fontSize: 24,
  },  
  addbutton: {
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  image: {
    height: 200,
    borderRadius: 20
  },
  sectionTitle: {
    margin: "5%",
    marginLeft: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#359A8E",
  },
  form: {
    alignItems: "center",
    paddingTop: "5%"
  },
  input: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: "60%",
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#4A0D66',
    color: 'black',
    margin: 10,
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '500',
    shadowColor: "#4A0D66",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default Contact;