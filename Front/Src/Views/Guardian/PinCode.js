import React, { Component } from 'react';
import { Dimensions, View, StatusBar, StyleSheet, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, Text }
    from 'react-native'


import CodePin from 'react-native-pin-code';

const PinCode = ({ navigation }) => {


    return (
        <ImageBackground source={require("./../../../assets/old.png")} resizeMode="cover" style={styles.image}>

            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Alzheimer Helper</Text>
                <View style={styles.container}>

                    <CodePin
                        ref={ref => (this.ref = ref)}
                        obfuscation
                        autoFocusFirst
                        code="fake_code"
                        number={4}
                        keyboardType="numeric"
                        checkPinCode={(code, callback) => callback(code === '1234')}
                        success={() => navigation.navigate("Home")}
                    />

                </View>

            </SafeAreaView>
        </ImageBackground>

    );


}


const styles = StyleSheet.create({
    root: {
        flex: 2,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(0,0,0, 0.30)'


    },

    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'flex-end',

    },
    title: {
        color: "#359A8E",
        fontSize: 28,
        paddingLeft: '2%',
        paddingTop: '2%',

    },
    image: {
        flex: 1,
    },

    innercontainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'rgba(0,0,0, 0.30)'

    },
    codeFieldRoot: {
        marginTop: 5
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#4A0D66',
        textAlign: 'center',
        borderRadius: 10,

    },
    focusCell: {
        borderColor: '#359A8E',
    },
    donebutton: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 25,
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 3,
        borderColor: '#359A8E',
        backgroundColor: '#fff',
        shadowColor: '#359A8E',
        shadowOpacity: 0.55,
        shadowRadius: 2.22,
        elevation: 11,
    },
});

export default PinCode;
