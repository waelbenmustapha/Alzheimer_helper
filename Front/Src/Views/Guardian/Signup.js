import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Text, TextInput, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";


const Signup = ({ navigation }) => {

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setConfirmUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);





  useEffect(() => {
  }, []);




 

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

    if (!userName.trim() || !userEmail.trim() || !userPassword.trim() || !userConfirmPassword.trim())
      return alert("Please fill in all fields are required ");

    if (userName.length < 3)
      return alert("Invalid Name");

    if (!regx.test(userEmail))
      return alert("invalid Email");

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

      axios.post(`https://alzhelper.herokuapp.com/guardian/SignUp`, {
        name: userName,
        email: userEmail,
        password: userPassword,
        comfirmPassword: userConfirmPassword,
        birthdate: "2022-02-27T19:59:52.278+00:00"
      }).then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          console.log("el reponse "+response)
          navigation.navigate("VerifRegistration")
        }
        if (response.status === 226) {
          alert("Email already exist!")
        }
      }).catch((error) => { alert(error); setIsLoading(false); })
    }
  }


  return (
<LinearGradient
      // Button Linear Gradient
      colors={["#5f0a87", "#a4508b"]}
      style={styles.container}
      end={{ x: 0.8, y: 0.5 }}
    >
      <View
        // Button Linear Gradient

        style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("../../../images/logo.png")}
          style={{ height: 250, width: 250 }}
        />
      </View>

      <View style={{flex:3, backgroundColor: "white",borderTopLeftRadius:25,borderTopRightRadius:25}}>
<ScrollView>
        <View style={{ flex: 1 }} >
          <View  style={{ alignItems:"center" }}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.form} >

            <TextInput
              style={styles.input}
              value={userName}
              placeholder='Name'
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
 {isLoading==false?
                 <TouchableOpacity style={styles.Signupbutton} onPress={handleSubmitPress} >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize:15,
                      fontWeight: "500",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                
                
                
           :<ActivityIndicator size={60} color="#0000ff" />
}
          </View>
               
        </View>
        <View style={styles.textCenter}>
      
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: '#359A8E' }}>
              Already have an account?</Text>
          </TouchableOpacity>
        
        </View>
        </ScrollView>
      </View>
    </LinearGradient>









   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerLogo: {
    flexDirection: "row",
  },
  form: {
    alignItems: "center",
    
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
    fontSize: 30,
    padding:15,
    color: "#5f0a87",

  },
  tilte2: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 18,
  },
  Signupbutton: {
    display: "flex",
marginTop:10,
marginBottom:10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5f0a87",
    width: "50%",
    height: 45,
    textAlign: "center",
    borderRadius: 20,

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
