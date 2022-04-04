import React, { useEffect, createRef, useState, hasError } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../Utils/Notif';

const SignIn = ({ navigation }) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  const [Data, setData] = useState('');
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => { console.log(token); setExpoPushToken(token) });

  }, []);
  const _removeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value !== null) {
        await AsyncStorage.removeItem('user')
      }
    } catch (e) {
      // remove error
    }

    console.log('Done.')
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("token",expoPushToken);
       AsyncStorage.setItem("user",JSON.stringify(Data)).then((value)=>
       {
         if(Data.type=="dementia")
       {
         navigation.replace("Home")
      return;
      }
      if(Data.pinCode==null)
      {
        navigation.replace("PinCode")
     return;
     }
     navigation.replace("PinCodeVerif")

       })


    } catch (error) {
      console.log(error)
    }
  };


  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim()) {

      alert("Please fell Email or Password")

      return;
    } setIsLoading(true);
      axios.post(encodeURI(`http://192.168.1.15:8090/auth/login/${expoPushToken}`), {
       email: userEmail,
      password: userPassword,
    }).then((response) => {
      if (response.status === 200) {
        setData(response.data)
        _storeData()

        console.log("singin data " + JSON.stringify(Data))
        console.log('done');
      }
    }).catch((error) => { console.log("ell error " + error); alert("Email or Password is wrong "); setIsLoading(false); })

  }




  return (
    <View style={styles.container}>

      <Text style={styles.title}>Glad to see you here</Text>

      <View>
        <View style={styles.form} >
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='#00000080'
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor='#00000080'
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
          />
        </View>
        <View>
          <View style={styles.textCenter}>
            <TouchableOpacity>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.Signupbutton} onPress={handleSubmitPress}>
            <AntDesign name="arrowright" style={styles.arrow} size={44} />
          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  form: {
    alignItems: "center",
    padding: 20
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
  title: {
    marginTop: 140,
    marginBottom: 18,
    fontSize: 24,
    color: '#359A8E'
  },
  tilte2: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 18,
  },
  Signupbutton: {
    margin: 10,
    marginLeft: "60%",
    backgroundColor: '#359A8E',
    width: 70,
    height: 49,
    borderRadius: 20,
    marginEnd: 80,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrow: {
    marginLeft: 13,
    color: "white"
  },
  textCenter: {
    alignItems: "center",
    margin: 5
  }

})

export default SignIn;