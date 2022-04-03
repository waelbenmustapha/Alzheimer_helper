import React, { useEffect, createRef, useState, hasError } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons';
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setemail]=useState("");

    const sendEmail = async () => {
        if (!email.trim()) {
            alert("Please fell the field to send you an email rest password")
            return;
        }
        console.log(`http://192.168.1.16:8090/auth/forgot-password/${email}`)
        axios.post(`http://192.168.1.16:8090/auth/forgot-password/${email}`)
        .then((response) => {
            if (response.status === 200) {
                alert("Check your email to reset apssword")
                console.log('done');
            }})
    }


    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", }}>
                <Text style={styles.title} >Forgot password?</Text>


                <View style={styles.form} >
                    <Text style={styles.title2} >Enter the email address associated with your account.</Text>
                    <View style={{ flexDirection: "row" }}>

                        <Fontisto style={{ justifyContent: "center", paddingTop: 15, color: "#359A8E" }} name="email" size={40} />

                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor='#00000080'
                            onChangeText={(value) => setemail(value)}
                        />
                    </View>
                </View>

                <View style={{ justifyContent: "flex-end", }}>
                    <TouchableOpacity style={styles.Signupbutton} onPress={() => sendEmail()}>
                        <Text style={styles.title3} >Reset Password</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
        marginTop: 140,
        marginBottom: 18,
        fontSize: 28,
        color: "#359A8E",
        justifyContent: "center"
    },
    title2: {
        textAlign:"center",
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
        margin:10,
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

export default ForgotPassword