import React from 'react'
import { Button } from 'react-bootstrap'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  TouchableOpacity, Text, StyleSheet,View } from 'react-native'





const Test = ({ navigation }) => {

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
    console.log(value)  
        }else{
            console.log("null")
        }
        } catch(e) {
console.log(e)        }}
  return (  
      <View style={styles.container}>
         <TouchableOpacity  onPress={() =>getData()}><Text>Test</Text></TouchableOpacity>

      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent:'center',
        marginTop:500
    }});

export default Test