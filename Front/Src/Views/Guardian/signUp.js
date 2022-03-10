import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity,Image , Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({ navigation }) => {

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
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



  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//inser

  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim() || !userName.trim() ) {
      alert("Please fill in all fields are required ");
      return;
    }
    
    
    if (!userName.length < 4 ) {
      alert ("Invalid name");
      return;
  }
  if (!reg.test.email ) {
      alert("Invalid Email");
      return;
  }
  if (!userPassword.length < 8){
      alert("Password is less then 8 characters!");
      return;
  }
  if (userPassword !== userConfirmPassword){
      alert ("Password does not match!")
      return;
  }setIsLoading(true);

    axios.post(`http://192.168.1.14:8090/guardian/SignUp`, {
      name: userName,
      email: userEmail,
      password: userPassword,
      comfirmPassword: userConfirmPassword,
      birthdate: "2022-02-27T19:59:52.278+00:00"
    }).then((response) => {
      console.log(response.status)
      if (response.status === 200) {
        navigation.navigate("SigninDementia")
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
              placeholder='User name'
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
            <TouchableOpacity               
             style={styles.input}
              onPress={showDatepicker}>
            {
              date == null?
             <Text style={styles.date0}>Birthdate</Text>:<Text style={styles.date}>{JSON.stringify(date
              ).substring(1,11)}</Text>
    
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
          <TouchableOpacity style={styles.Signupbutton}  onPress={handleSubmitPress} >
            <AntDesign name="arrowright" style={styles.arrow} size={44} />
          </TouchableOpacity>

        </View>
        <View style={styles.textCenter}>
          <TouchableOpacity>
            <Text style={styles.textCenter}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SigninDementia")}>
            <Text style={styles.title2}>
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
    flexDirection: "row",
  },
  form: {
    alignItems: "center"
  },
  input: {
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    marginTop: 12,
    marginBottom: 18,
    fontSize: 24,
    color: '#359A8E'
  },
  tilte2: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 18,
    color: '#359A8E'
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
  },
  date: {

    color: "#000",
    fontSize:18
  },
  date0: {

    color: "#C0C0C0",
    fontSize:18
  },
})

export default Signup;
