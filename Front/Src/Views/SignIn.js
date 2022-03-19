import React, { useEffect, createRef, useState, hasError } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';


const SignIn = ({ navigation }) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log("connect")

  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim()) {
     
        alert("Please fell Email or Password")
        
      return;
    } setIsLoading(true);
      axios.post(`http://192.168.8.100:8090/auth/login/{pushtoken}`, {
       email: userEmail,
      password: userPassword,
      }).then((response) => {
        if (response.status === 200) {
          console.log('done');
          navigation.navigate("PinCode")
        } 
      }).catch((error) => { (ToastAndroid.showWithGravity("Email or Password is wrong",ToastAndroid.LONG,ToastAndroid.BOTTOM)),setIsLoading(false)})
    
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
