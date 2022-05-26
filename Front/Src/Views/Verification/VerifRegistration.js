import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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
                console.log(`https://alzhelper.herokuapp.com/auth/verify/${verificationcode}`)
                axios.post(`https://alzhelper.herokuapp.com/auth/verify/${verificationcode}`, 
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
            <ScrollView>
                <View style={{ alignItems: "center", }}>
                    <Text style={styles.title} > Account activation</Text>

                    <View style={styles.form} >
                        <Text style={styles.title2} >To activate your account, enter your security code.</Text>
                        <View style={{ flexDirection: "row" }}>


                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder='Activation Code'
                                placeholderTextColor='#00000080'
                                maxLength={6}
                                onChangeText={(code) => setCode(code)}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: "flex-end", }}>
                        <TouchableOpacity style={styles.Signupbutton} onPress={() => SubmitPress()}>
                            <Text style={styles.title3} >Verification</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#F5F5F3',

    },

    form: {
        alignItems: "center",
        padding: 20
    },
    input: {
        alignItems: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#359A8E',
        borderWidth: 1,
        color: 'black',
        margin: 10,
        padding: 8,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: '500',
        shadowColor: "#359A8E",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        marginTop: "20%",
        marginBottom: 18,
        fontSize: 28,
        color: "#359A8E",
        justifyContent: "center"
    },
    title2: {
        textAlign: "center",
        marginTop: 14,
        marginBottom: 18,
        fontSize: 20,
        color: "#359A8E"
    },
    title3: {
        fontSize: 18,
        color: "#fff",
    },
    Signupbutton: {
        alignItems: "center",
        backgroundColor: '#359A8E',
        margin: 10,
        padding: 10,
        width: 220,
        height: 50,
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


})



export default VerifRegistration;
