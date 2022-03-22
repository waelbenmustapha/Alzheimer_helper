import { View, Text,StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { Component, useState } from 'react'
import axios from 'axios';


const PinCodeVerif = ({navigation}) => {

    const [pincode, setCode] = useState('');

    const handleSubmitPress = async (event) => {
        if (!pincode.trim()) {
          alert("Entry your Pin Code");
          return;
        } setIsLoading(true);
          axios.get(`http://192.168.1.26:8090/guardian/test-pin/4028819a7fa2f840017fa2f96bde0000/{pincode}`, {
            pincode: pincode
        }).then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                console.log('done'),
              navigation.navigate("Home")
            }
        }).catch((error) => { alert(error); setIsLoading(false); })
        
      }
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
        <Text style={styles.passcodeText}> Enter Pin Code</Text>
        <View style={styles.codeContainer}>
            <TextInput
                style={styles.code1}
                placeholder='****'
                secureTextEntry={true}
                maxLength={4}
                keyboardType="number-pad"
                onChangeText={(pincode) => setCode(pincode)}
            />
            <TouchableOpacity onPress={() => handleSubmitPress()}>
                <Text style={[styles.buttonText, { color: "#359A8E" }]}>Submit Pin Code</Text>
            </TouchableOpacity>
        </View>
    </View>

    <View style={styles.buttons}>

        <TouchableOpacity>
            <Text style={[styles.buttonText, { color: "red" }]}>Forgot Pin Code</Text>
        </TouchableOpacity>

    </View>
</SafeAreaView>
)

}


const styles = StyleSheet.create({
container: {
flex: 20,
justifyContent: "flex-end",
alignItems: "center",
backgroundColor:"violet"
},



passcodeText: {
fontSize: 32,
color: '#359A8E',
letterSpacing: 0.34,
justifyContent: "center",

},
codeContainer: {
marginTop: 12,
flexDirection: 'column',
alignItems:"center",
justifyContent: 'center',
color: "#359A8E",
},
code1: {
fontSize: 24,
color: "#000",
paddingLeft: "20%",
paddingRight: "20%",
padding: 10,
borderRadius: 50,
borderWidth: 1,
borderColor: "#359A8E",
},

buttons: {
marginTop: 73,
marginLeft: 46,
marginRight: 46,
flexDirection: 'row',
alignItems: "center",
justifyContent: 'space-between',
},

buttonText: {
fontSize: 16,
color: '#000',
padding:"10%",
letterSpacing: -0.39,
}
})

export default PinCodeVerif;