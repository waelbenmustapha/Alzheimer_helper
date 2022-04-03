import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const VerifRegistration = ({ navigation }) => {

    const [verificationcode, setCode] = useState('');
    const SubmitPress = async (event) => {
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                if (!verificationcode.trim()) {
                    alert("Please Entry security code");
                    return;
                }
                console.log(`http://192.168.8.100:8090/auth/verify/${verificationcode}`)
                axios.post(`http://192.168.8.100:8090/auth/verify/${verificationcode}`, 
                { verificationcode: verificationcode})
                    .then((response) => {
                        console.log(response.status)
                        if (response.status === 200) {
                            navigation.navigate("SignIn")
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    })
            })
    }
  return (
       <View style={styles.container}>
    
      <Text Textstyle={styles.text} >To activate your account, enter your security code</Text>
      <TextInput
                style={styles.code1}
                secureTextEntry={true}
                maxLength={6}
                onChangeText={(code) => setCode(code)}
        />
     <TouchableOpacity onPress={() => { SubmitPress() }} >
      <Text style={styles.donebutton}>Verification</Text>
    </TouchableOpacity>
    </View>
  )
}

export default VerifRegistration;
const styles = StyleSheet.create({
    container: {
        flex: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "violet"
    },
    text:{
        fontSize:50
    },
    code1: {
        fontSize: 28,
        color: "#000",
        paddingLeft: "20%",
        paddingRight: "20%",
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#359A8E",
    },
    
donebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#093F38',
    backgroundColor: '#fff',
    shadowColor: '#093F38',
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 11,
  },
})