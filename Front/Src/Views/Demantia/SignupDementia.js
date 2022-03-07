import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
const SignupDementia = ({ navigation }) => {

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setConfirmUserPassword] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim() ||  !userName.trim() || !guardianEmail.trim()) {
      ToastAndroid.showWithGravity(
        "Please fill in all fields are required",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM)
      return;
    } setIsLoading(true);

    axios.post(`http://172.16.18.122:8090/demantia/SignUp/${guardianEmail}`, {
      name: userName,
      email: userEmail,
      password: userPassword,
      comfirmPassword: userConfirmPassword,
      age: age,
      birthdate: "2022-02-27T19:59:52.278+00:00"
    }).then((response) => {
      console.log(response.status)
      if (response.status === 200) {
        //alert(` You have created: ${JSON.stringify(response.data)}`);
        ToastAndroid.showWithGravity("You have created", ToastAndroid.LONG,ToastAndroid.BOTTOM)
        setIsLoading(false);
        setUserName('');
        setAge('');
        setUserEmail('');
        setUserPassword('');
        setConfirmUserPassword('');
        setGuardianEmail('');
      }
    }).catch((error) => { alert(error); setIsLoading(false); })
  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={{ flex: 1 }} >
          <View style={styles.form} >
            <Text style={styles.title}>Glad to see you here</Text>

            <TextInput
              style={styles.input}
              value={userName}
              placeholder='Dementia Name'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={(UserName) => setUserName(UserName)}
            />
         
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none" 
              value={userEmail}
              placeholderTextColor='#00000080'
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              autoCapitalize="none"
              value={userPassword}
              secureTextEntry={true}
              placeholderTextColor='#00000080'
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              autoCapitalize="none"
              value={userConfirmPassword}
              secureTextEntry={true}
              placeholderTextColor='#00000080'
              onChangeText={(UserConfirmPassword) => setConfirmUserPassword(UserConfirmPassword)}
            />
            <TextInput
              style={styles.input}
              placeholder='Guardian Email'
              value={guardianEmail}
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={(GuardianEmail) => setGuardianEmail(GuardianEmail)}
            />

          </View>
          <TouchableOpacity style={styles.Signupbutton} onPress={handleSubmitPress}>
            <AntDesign name="arrowright" style={styles.arrow} size={44} />
          </TouchableOpacity>

        </View>
        <View style={styles.textCenter}>
          <TouchableOpacity>
            <Text style={styles.textCenter}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={ { color: '#359A8E' }}>
              Already have an account</Text>
          </TouchableOpacity>
          <Text style={styles.textCenter}>Or login with</Text>

          <View style={styles.containerLogo}>
            <TouchableOpacity style={styles.textCenter}><MaterialCommunityIcons name="gmail" size={50} color="black" /></TouchableOpacity>
            <TouchableOpacity style={styles.textCenter}><AntDesign name="twitter" size={44} color="black" /></TouchableOpacity>
            <TouchableOpacity style={styles.textCenter}><AntDesign name="apple1" size={44} color="black" /></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  containerLogo: {
    padding:5,
    flexDirection: "row",
  },
  form: {
    alignItems: "center"
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
    marginLeft: 250,
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
    textAlign: 'center',
    alignItems: "center",
    margin: 5
  }

})

export default SignupDementia;