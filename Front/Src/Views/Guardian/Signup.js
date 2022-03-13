import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Text, TextInput, StyleSheet,ToastAndroid } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { validatePathConfig } from '@react-navigation/native';

const Signup = ({ navigation }) => {

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setConfirmUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // Birthdate
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    currentDate.setHours(currentDate.getHours() + 1)
    setDate(currentDate);

    if (mode == "date") {
      setMode("time");

    }

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };





  const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const isValid = () => {

    if (!userName.trim() || !userEmail.trim() || !userPassword.trim())
      return alert("Please fill in all fields are required ");

    if (userName.length < 3)
     return alert("Invalid Name");
    
    if (!regx.test(userEmail))
     return alert ("invalid Email");

    if (!userPassword.length > 8) 
     return alert("Password is less then 8 characters!");
    
    if (userPassword !== userConfirmPassword) 
      return alert("Password does not match!");
    
      return true;
  };

  //inser

  const handleSubmitPress = async (event) => {
    if (isValid()) {

      setIsLoading(true);

      axios.post(`http://192.168.8.100:8090/guardian/SignUp`, {
        name: userName,
        email: userEmail,
        password: userPassword,
        comfirmPassword: userConfirmPassword,
        birthdate: "2022-02-27T19:59:52.278+00:00"
      }).then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          navigation.navigate("Signin")
        }
        if (response.status === 226){
          alert("Email already exist!")
        }
      }).catch((error) => { alert(error); setIsLoading(false); })
    }
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
            <TouchableOpacity
              style={styles.input}
              onPress={showDatepicker}>
              {
                date == null ?
                  <Text style={styles.date0}>Dementia Birthdate</Text> : <Text style={styles.date}>{JSON.stringify(date
                  ).substring(1, 11)}</Text>

              }
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(1598051730000)}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={styles.date0}
              />
            )}

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

          </View>
          <TouchableOpacity style={styles.Signupbutton} onPress={handleSubmitPress} >
            <AntDesign name="arrowright" style={styles.arrow} size={44} />
          </TouchableOpacity>
        </View>
        <View style={styles.textCenter}>
          <TouchableOpacity>
            <Text style={styles.textCenter}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={{ color: '#359A8E' }}>
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
    flex: 1,
    flexDirection: "row"
  },
  containerLogo: {
    flexDirection: "row",
  },
  form: {
    alignItems: "center"
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
  title: {
    marginTop: "10%",
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
    width: "18%",
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
  },
  date: {

    color: "#000",
    fontSize: 18
  },
  date0: {
    color: '#00000080',
    fontSize: 18
  },
})

export default Signup;
