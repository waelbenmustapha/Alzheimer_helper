import React, { useEffect, createRef, useState, hasError } from 'react'
import { View, ScrollView,ActivityIndicator, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const FVerificationCode = () => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const submitCode = async () => {
        if (!code.trim()) {
            alert("Please fell the field to verify the code")
            return;
        }
        console.log(`https://alzhelper.herokuapp.com/auth/verify/${code}`)
        axios.post(`https://alzhelper.herokuapp.com/auth/verify/${code}`)

            .then((response) => {
                if (response.status === 200) {
                    navigation.navigate("FChangePassword")
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
                <Text style={styles.title} >Verification</Text>

                <Ionicons style={{ justifyContent: "center", paddingTop: 15, color: "#359A8E" }} name="mail-open-outline" size={40} />
                <ActivityIndicator size="large" color="#359A8E" animating={isLoading} />

                <View style={styles.form} >
                    <Text style={styles.title2} >Enter the One Time Code Verification.</Text>
                    <View style={{ flexDirection: "row" }}>


                        <TextInput
                            style={styles.input}
                            placeholder='Verification Code'
                            autoCapitalize="none"
                            placeholderTextColor='#00000080'
                            onChangeText={(value) => setCode(value)}
                        />
                    </View>
                </View>

                <View style={{ justifyContent: "flex-end", }}>
                    <TouchableOpacity style={styles.Signupbutton} onPress={() => submitCode()}>
                        <Text style={styles.title3} >Verify</Text>
                    </TouchableOpacity>
                </View>

            </View>
           {/*  <View style={{padding:"5%", alignItems:"flex-end" }}>
                <TouchableOpacity style={{justifyContent:"flex-end"}} onPress={()=> resendCode()} >
                    <Text style={{color:"#359A8E", fontSize:18}}>Resend Code</Text>
                </TouchableOpacity>
            </View> */}
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


export default FVerificationCode