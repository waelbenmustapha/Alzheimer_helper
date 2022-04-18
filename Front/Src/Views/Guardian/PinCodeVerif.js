import { View, Text,ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { Component, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PinCodeVerif = ({ navigation }) => {

    const [pincode, setCode] = useState('');


    const handleSubmitPress = async (event) => {
        AsyncStorage.getItem('user')
            .then(value => {
                console.log(JSON.parse(value));
                if (!pincode.trim()) {
                    alert("Please Entry Pin code");
                    return;
                }


                axios.get(`https://alzhelper.herokuapp.com/guardian/test-pin/${JSON.parse(value).id}/${pincode}`, {
                })
                    .then((res) => {
                        console.log()
                        if (res.data == false) {
                            alert("Pin code is not correct");
                        } else {
                            navigation.navigate("drawer")

                        }
                    })
                    .catch((error) => {
                        alert(error);
                    })

            })
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("./../../../assets/old.png")} style={styles.image}
            >
                <View style={styles.container}>
                    <Text style={styles.passcodeText}>Pin Code</Text>
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
            </ImageBackground>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 20,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    image:{
        
    height: '100%',
    width: '100%',
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
        alignItems: "center",
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
        padding: "10%",
        letterSpacing: -0.39,
    }
})

export default PinCodeVerif;