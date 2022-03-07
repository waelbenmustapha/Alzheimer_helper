import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';


const HistoryDemantia = ({route,navigation}) => {
    const [history, setHistory] = useState('');

  return (
    <View style={styles.container}>
    <View style={{ flex: 3, flexDirection: "column" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("./../../../assets/profile.png")}
          style={styles.image}
        ></Image>
        <View style={styles.firstItem}>
          <Text style={styles.Title}>Welcome Alex Ten Napel </Text>
          <Text style={styles.Title}>Your age is 80 </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
      <TouchableOpacity style={styles.Sound}><AntDesign name="sound" style={styles.arrow} size={30} /></TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.square}>{history.description}</Text>
        </View>
        </ScrollView>
      </View>
      </View>
      

  )
}

export default HistoryDemantia


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: '5%',
  },
 
  image: {
    width: 100,
    height: 100,
    borderRadius: 40 / 2,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  item: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 0,
  },
  square: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignSelf: "center",
    shadowColor: "#093F38",
    shadowOpacity: 0.55,
    shadowRadius: 2.22,
    elevation: 8,
  },
  
  scrollView: {
    marginHorizontal: 5,
  },
  Sound: {
    marginLeft:250,
    marginTop:0

  }

      
      
   
    });