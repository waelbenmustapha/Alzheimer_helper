import React from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export default class SignUp extends React.Component {
  state = {
    username: '', age: '', email: '', password: '', confirm_password: '', guardian_email: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, age, email, password, guardian_email } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} >
          <View style={styles.form} >
            <Text style={styles.tilte}>Glad to see you here</Text>

            <TextInput
              style={styles.input}
              placeholder='User name'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('username', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Age'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('age', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('email', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Guardian Email'
              autoCapitalize="none"
              placeholderTextColor='#00000080'
              onChangeText={val => this.onChangeText('guardian_email', val)}
            />

          </View>
          <TouchableOpacity style={styles.Signupbutton}>
            <AntDesign name="arrowright" style={styles.arrow} size={44}  />
          </TouchableOpacity>

        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
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
    margin: 15,
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
  tilte: {
    marginTop: 18,
    marginBottom: 18,
    fontSize: 24,
    color: '#359A8E'
  },
  Signupbutton: {
    margin:20,
    marginLeft:250,
    backgroundColor:'#359A8E',
    width: 70,
    height: 49,
    borderRadius:20,
    marginEnd:80,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrow:{
    marginLeft:13,
    color:"white"
  }

})
