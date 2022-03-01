import { View,StyleSheet,TextInput,TouchableOpacity,Text } from 'react-native'
import React,{ useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';




const SignIn =  ({navigation}) => {


  const [userEmail, setemail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmitPress = async (event) => {
    if (!userEmail.trim() || !userPassword.trim()) {
      alert("Please fill Email or Password");
      return;
    } setIsLoading(true);
    try {
      const response = await axios.post(`http://192.168.1.14:8090/guardian/SignIn/${email}`, {
        userEmail,
        userPassword,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setemail('');
        setPassword('');
      } else {
        throw new Error("An error has occurred Name or Email is invalid");
      }
    } catch (error) {
      alert("An error has occurred Name or Email is invalid");
      setIsLoading(false);
    }



  }


  
  return (
    <View style={styles.container}>
        <Text style={styles.title}> Glad to see you here again</Text>
        <TextInput style={styles.input} placeholder='Email adress'  placeholderTextColor='#00000080'onChangeText={(text)=>setemail(text)}/>
        <TextInput style={styles.input} placeholder='Password' placeholderTextColor='#00000080'onChangeText={(text)=>setPassword(text)} />        
        <Text style={styles.fpass}>Forgot password?</Text>
        <TouchableOpacity style={styles.Signinbutton} onPress={()=>{handleSubmitPress()}}><AntDesign name="arrowright" style={styles.arrow} size={44}  /></TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
        left: 37,
        top:84, 
    },
    title:{
        marginTop: 18,
        marginBottom: 18,
        fontSize: 24,
        color: '#359A8E'

    },
    input:{
        alignItems: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#4A0D66',
        color: 'black',
        margin: 5,
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
    fpass:{
        fontSize:15,
        marginTop:40,
        marginLeft:40,
    },
    Signinbutton: {
        margin:20,
        marginLeft:240,
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