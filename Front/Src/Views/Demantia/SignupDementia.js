import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const SignupDementia = ({ navigation }) => {

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim() || !userName.trim() || !age.trim() || !guardianEmail.trim()) {
      alert("Please fill in all fields are required ");
      return;
    } setIsLoading(true);
    try {
      const response = await axios.post(`http://192.168.1.14:8090/demantia/SignUp/${email}`, {
        userName,
        age,
        userEmail,
        userPassword,
        guardianEmail,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setUserName('');
        setAge('');
        setUserEmail('');
        setUserPassword('');
        setGuardianEmail('');
      } 
    } catch (error) {
      alert("An error has occurred !");
      setIsLoading(false);
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
              placeholder='User name'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={(UserName) => setUserName(UserName)}
            />
            <TextInput
              style={styles.input}
              placeholder='Age'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={(Age) => setAge(Age)}
            />
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
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor='#00000080'
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            />
            <TextInput
              style={styles.input}
              placeholder='Guardian Email'
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
          <TouchableOpacity onPress={() => navigation.navigate("SigninDementia")}>
            <Text style={[styles.title2], { color: '#359A8E' }}>
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