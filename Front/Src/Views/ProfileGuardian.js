import { View, Modal, Text, Pressable, StyleSheet, Image ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileElement from "../Components/ProfileElement";
import DementiaProfileElement from '../Components/DementiaProfileElement';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from 'react-native-elements/dist/config';
import axios from 'axios';

const ProfileGuardian = () => {
  const [userData, setuserData] = useState(null);
  const [image, setImage] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [loader, setloader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNumber, setModalVisibleNumber] = useState(false);
  const isFocused = useIsFocused()
  const [state, setState] = useState('valid');




  async function updateUser(user) {
    await AsyncStorage.setItem("user", JSON.stringify(user))
  }


  const submitUpdate = () => {

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        if (JSON.parse(value).type) {
          axios.put(`https://alzhelper.herokuapp.com/dementia/edit-profile/${JSON.parse(value).dementia.id}`,
            {
              pushToken: JSON.parse(value).pushToken,
              birthdate: JSON.parse(value).dementia.birthdate,
              email: JSON.parse(value).dementia.email,
              password: JSON.parse(value).dementia.password,
              name: JSON.parse(value).dementia.name,
              story: JSON.parse(value).dementia.story,
              latitude: JSON.parse(value).dementia.latitude,
              longitude: JSON.parse(value).dementia.longitude,
              verified: JSON.parse(value).verified,
              image: image
            })
            .then((response) => {
              console.log(response.status)
              if (response.status === 200) {
                const user = userData;
                user.dementia.image = image;
                updateUser(user);
                getData()
                alert("Image added!")

              }
            })
        }
      })

  }

  const submitUpdateNumber = () => {

    AsyncStorage.getItem('user')
      .then(value => {
        console.log(JSON.parse(value));
        if (JSON.parse(value).type) {
          console.log(JSON.parse(value).dementia.id)
          axios.put(`https://alzhelper.herokuapp.com/guardian/edit-profile/${JSON.parse(value).id}`,
            {
              pushToken: JSON.parse(value).pushToken,
              email: JSON.parse(value).email,
              password: JSON.parse(value).password,
              name: JSON.parse(value).name,
              pincode: JSON.parse(value).pincode,
              dementia: JSON.parse(value).dementia,
              verified: JSON.parse(value).verified,
              pinCode: JSON.parse(value).pinCode,
              phoneNumber: phoneNumber
            })
            .then((response) => {
              console.log(response.status)
              if (response.status === 200) {
                const user = userData;
                user.phoneNumber = phoneNumber;
                updateUser(user);
                console.log(user)
                getData()
                alert("Phone Number updated!")

              }
            })
        }
      })

  }



  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`
        }
        handleUpload(newfile)
      }
    } else {
      alert("you need to give up permission to work")
    }
  }

  const handleUpload = (image) => {
    setloader(true)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'dementia')
    data.append("cloud_name", "elaa")
    fetch("https://api.cloudinary.com/v1_1/elaa/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setloader(false)
        console.log(data.url)
        setImage(data.url)
      }).catch(err => {
        alert("error while uploading")
      })
  }

  async function getData() {
     const user = await AsyncStorage.getItem('user')
      setuserData(JSON.parse(user))
    }

  useEffect(() => {
    getData()
  }, [isFocused]);

  if (userData == null) {
    return (
      <View>
                <ActivityIndicator size={60} color="#0000ff" style={{justifyContent:"center", alignContent:"center"}} />
      </View>
    )
  }
  return (
    <LinearGradient
    // Button Linear Gradient
    colors={["#359A8E50", "#4A0D6650"]}
    style={styles.container}
    end={{ x: 0.8, y: 0.5 }}
  >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Your informations :</Text>
        <View style={styles.items}>
          <Text style={styles.subtitle}>Name:</Text><Text style={styles.sectionTitle}>{userData.name}</Text>
          <Text style={styles.subtitle}>Email:</Text><Text style={styles.sectionTitle}>{userData.email}</Text>
          <Text style={styles.subtitle}>Number:</Text><Text style={styles.sectionTitle}>{userData.phoneNumber}</Text>

          <View style={[styles.fixToText]}>
            <TouchableOpacity
              onPress={() => setModalVisibleNumber(true)}
              style={styles.donebutton}>
              <Text style={styles.text}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>Your Dementia informations:</Text>

        <View style={styles.items}>
          <DementiaProfileElement userData={userData} />

          <View style={[styles.fixToText]}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.donebutton}>
              <Text style={styles.text}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>



      </ScrollView>


      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <LinearGradient
          // Button Linear Gradient
          colors={[ "#4A0D6650","#359A8E50"]}
          style={styles.container}
          end={{ x: 0.8, y: 0.5 }}
        >
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <AntDesign name="closecircleo" size={40} color="black" />
                </Pressable>
                <View style={styles.form}>
                  <Pressable
                    onPress={() => pickFromGallery()}>
                    {loader == false ? <Entypo name="image" size={40} color="black" /> :
                      <Text>loading</Text>}
                    <Image
                      resizeMode='stretch'
                      style={styles.image}
                      source={{ uri: image }}
                    />
                  </Pressable>
                </View>
                <View style={styles.fixToText}>
                  <Pressable
                    onPress={() => { submitUpdate(); setModalVisible(!modalVisible); }}
                    style={styles.donebutton}>
                    <Text style={styles.text}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </Modal>


      <Modal animationType="slide"
        transparent={true}
        visible={modalVisibleNumber}
        onRequestClose={() => {
          setModalVisibleNumber(!modalVisibleNumber);
        }}>
        <LinearGradient
          // Button Linear Gradient
          colors={["#4A0D6650","#359A8E50"]}
          style={styles.container}
          end={{ x: 0.8, y: 0.5 }}
        >

          <ScrollView>
            <View style={styles.centeredView}>

              <View style={styles.modalView}>
                <Pressable onPress={() => setModalVisibleNumber(!modalVisibleNumber)}>
                  <AntDesign name="closecircleo" size={40} color="black" />
                </Pressable>
                <View style={styles.form}>
                  <Text style={[styles.subtitle, { color: "#000" }]}>Number</Text>
                  <TextInput style={styles.input} onChangeText={(UserNumber) => setphoneNumber(UserNumber)}>{userData.phoneNumber}</TextInput>

                </View>
                <View style={styles.fixToText}>
                  <Pressable
                    onPress={() => { submitUpdateNumber(); setModalVisibleNumber(!modalVisibleNumber); }}
                    style={styles.donebutton}>
                    <Text style={styles.text}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: "5%",
  },
  item: {
    margin: "1%",
    borderRadius: 10,
    justifyContent: "space-between",
    marginTop: "3%",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "#359A8E",
    marginLeft: "1%",
    paddingTop: "3%"

  },
  subtitle: {
    fontSize: 20,
    color: "#00000090",
    marginLeft: "1%",

  },
  sectionTitle: {
    margin: "2%",
    marginLeft: "5%",
    fontSize: 24,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#00000010",

  },
  input: {
    alignItems: 'center',
    width: 300,
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
  image: {
    justifyContent: "center",
    padding: "30%",
    width: "50%",
    height: "50%",
    borderRadius: 40 / 2,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  square: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#359A8E",
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
  modalView: {
    margin: 20,
    backgroundColor: "#F5F5F3",
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
  form: {
    alignItems: "center",
    paddingTop: "5%"
  },
  text: {
    fontSize: 18,

  },
  donebutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#359A8E",
    backgroundColor: "#359A8E",
    shadowColor: "#359A8E",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
  fixToText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: "2%",
  },
});
export default ProfileGuardian