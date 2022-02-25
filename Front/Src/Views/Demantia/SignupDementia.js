import React, { useEffect, useState }  from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const SignupDementia = ({ navigation }) => {

 /* const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

   const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = { email: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  }; */


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={{ flex: 1 }} >
          <View style={styles.form} >
            <Text style={styles.title}>Glad to see you here</Text>

            <TextInput
              style={styles.input}
              placeholder='User name'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
            />
            <TextInput
              style={styles.input}
              placeholder='Age'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor='#00000080'
            />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor='#00000080'
             
            />
            <TextInput
              style={styles.input}
              placeholder='Guardian Email'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              
            />
{/* onChangeText={val => this.onChangeText('guardian_email', val)} */}
          </View>
          <TouchableOpacity style={styles.Signupbutton}>
            <AntDesign name="arrowright" style={styles.arrow} size={44}/>
          </TouchableOpacity>

        </View>
        <View style={styles.textCenter}>
          <TouchableOpacity>
            <Text style={styles.textCenter}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.title2], { color: '#359A8E' }}
              >
              Already have an account</Text>
          </TouchableOpacity>
          <Text style={styles.textCenter}>Or login with</Text>

          <View style={styles.containerLogo}>
            <TouchableOpacity style={styles.textCenter}><MaterialCommunityIcons name="gmail" size={50} color="black" /></TouchableOpacity>
            <TouchableOpacity style={styles.textCenter}><AntDesign name="apple1" size={44} color="black" /></TouchableOpacity>
            <TouchableOpacity style={styles.textCenter}><AntDesign name="twitter" size={44} color="black" /></TouchableOpacity>
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
    marginTop: 12,
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
