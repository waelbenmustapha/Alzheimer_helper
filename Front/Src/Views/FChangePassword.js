import React, { useEffect, createRef, useState, hasError } from 'react'
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FChangePassword = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword] =useState("");
    const navigation = useNavigation();

    const submitChangePassword = async () => {
        if (!email.trim() || !password.trim()) {
            alert("Please fell all field ")
            return;
        }
        console.log(`http://192.168.1.60:8090/auth/change-password/${email}`)
        console.log(`http://192.168.1.60:8090/auth/change-password/${password}`)
        axios.put(`http://192.168.1.60:8090/auth/change-password/${email}`,
        password,{headers:{ 
            'Content-Type': 'text/plain'
          }})
            .then((response) => {
                if (response.status === 200) {
                    navigation.navigate("SignIn")
                    console.log('done');
                }
                if (response.status == 401) {
                    alert("One Time Code is not valid")
                    return;
                }
            })
    }
    
  return (
    <View style={styles.container}>
            <ScrollView>
            <View style={{ alignItems: "center", }}>
                <Text style={styles.title} >Change your password</Text>

                <MaterialCommunityIcons style={{ justifyContent: "center", paddingTop: 15, color: "#359A8E" }} name="key-change" size={40} />

                <View style={styles.form} >
                    <Text style={styles.title2} >Enter your Email</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor='#00000080'
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                    <Text style={styles.title2} >Enter your new password</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={styles.input}
                            placeholder='New password'
                            autoCapitalize="none"
                            placeholderTextColor='#00000080'
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>
                </View>

                <View style={{ justifyContent: "flex-end", }}>
                    <TouchableOpacity style={styles.Signupbutton} onPress={() => submitChangePassword()}>
                        <Text style={styles.title3} >Submit changes</Text>
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
        backgroundColor: '#F5F5F3',

    },

    form: {
        alignItems: "flex-start",
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
        marginTop: "10%",
        marginBottom: 18,
        fontSize: 28,
        color: "#359A8E",
        justifyContent: "center"
    },
    title2: {
        marginTop: 14,
        marginBottom: 18,
        fontSize: 20,
        color: "#000"
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

export default FChangePassword