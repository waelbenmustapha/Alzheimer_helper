import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function DementiaProfileElement(props) {

  const [userData, setuserData] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setloader] = useState(false);
  const isFocused = useIsFocused()

  let base64Img = `data:image/jpg;base64,${image}`;

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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


  return (
    <View style={styles.container}>
      <View style={styles.firstItem}>
        <Text style={styles.subtitle}>Dementia name </Text>
        <Text style={styles.sectionTitle}>{props.userData.dementia.name} </Text>
        <Text style={styles.subtitle}> Birthdate </Text>
        <Text style={styles.sectionTitle}>{JSON.stringify((props.userData.dementia.birthdate)).substring(1, 11)} </Text>
        <Text style={styles.subtitle}>Dementia email </Text>
        <Text style={styles.sectionTitle}>{props.userData.dementia.email}</Text>

        <View style={{ padding: "2%", justifyContent: "center", flexDirection: "row" }}>
          <Image
            resizeMode='stretch'
            style={styles.image}
            source={{ uri: props.userData.dementia.image }}
          />
        </View>
        
      </View>

    </View>)
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  firstItem: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column"
  },
  image: {
    padding: "20%",
    borderRadius: 40 / 2,
  },
  title: {
    fontSize: 24,
    color: "#359A8E",
    marginLeft: "1%",

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
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    color: "#424242",
  }
})
